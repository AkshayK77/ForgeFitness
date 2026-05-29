import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.openstreetmap.ru/api/interpreter',
]

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { lat, lng } = await req.json() as { lat: number; lng: number }

    if (!lat || !lng) {
      return new Response(JSON.stringify({ error: 'lat and lng required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    const query = `[out:json];(node["leisure"="fitness_centre"](around:10000,${lat},${lng});node["amenity"="gym"](around:10000,${lat},${lng}););out body;`

    let lastErr: unknown
    for (const endpoint of ENDPOINTS) {
      try {
        const controller = new AbortController()
        const timer = setTimeout(() => controller.abort(), 20000)
        const res = await fetch(`${endpoint}?data=${encodeURIComponent(query)}`, { signal: controller.signal })
        clearTimeout(timer)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          lastErr = new Error('Request timed out after 20s')
        } else {
        lastErr = err
        }
      }
    }

    return new Response(JSON.stringify({ error: String(lastErr) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 502,
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
