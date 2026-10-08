"""Mide los cortes de color entre secciones (2026-10-08).

Uso: con `npx next dev -p 3100` corriendo:
  pip install websocket-client numpy pillow
  python scripts/medir_uniones.py <etiqueta> inicio,sobre-nosotros,como-trabajamos,soluciones
Captura cada pagina entera en tema oscuro y claro (via CDP, fijando localStorage.theme) y
guarda PNG + bordes de seccion en $TEMP/seams. Despues, `medir()` imprime el salto maximo de
luminosidad (0-255) entre filas en cada borde. Antes del arreglo: 27,2 (oscuro) y 232,7
(claro); despues: 1,0 y 0,7. Por encima de ~3 se ve una linea.
"""
import websocket
C = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
OUT = os.path.join(os.environ['TEMP'], 'seams'); os.makedirs(OUT, exist_ok=True)
prof = tempfile.mkdtemp()
p = subprocess.Popen([C, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=9333', '--remote-allow-origins=http://127.0.0.1:9333', f'--user-data-dir={prof}', 'about:blank'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
for _ in range(50):
    try:
        tabs = json.load(urllib.request.urlopen('http://127.0.0.1:9333/json')); break
    except Exception: time.sleep(0.2)
ws = websocket.create_connection([t for t in tabs if t['type']=='page'][0]['webSocketDebuggerUrl'], timeout=60)
n = [0]
def cmd(m, **params):
    n[0] += 1; ws.send(json.dumps({'id': n[0], 'method': m, 'params': params}))
    while True:
        r = json.loads(ws.recv())
        if r.get('id') == n[0]: return r.get('result', {})
cmd('Page.enable'); cmd('Runtime.enable')
tag = sys.argv[1]
pages = sys.argv[2].split(',')
for theme in ['dark', 'light']:
    for path in pages:
        cmd('Emulation.setDeviceMetricsOverride', width=1440, height=900, deviceScaleFactor=1, mobile=False)
        cmd('Page.navigate', url='http://localhost:3100/' + ('' if path=='inicio' else path)); time.sleep(4)
        cmd('Runtime.evaluate', expression=f"localStorage.setItem('theme','{theme}')")
        cmd('Page.reload'); time.sleep(5)
        h = cmd('Runtime.evaluate', expression='document.documentElement.scrollHeight', returnByValue=True)['result']['value']
        cmd('Emulation.setDeviceMetricsOverride', width=1440, height=int(h), deviceScaleFactor=1, mobile=False); time.sleep(3)
        th = cmd('Runtime.evaluate', expression="document.documentElement.getAttribute('data-theme')", returnByValue=True)['result']['value']
        b = cmd('Runtime.evaluate', expression="JSON.stringify([...document.querySelectorAll('.site-motion section, .site-motion footer, .site-motion [class*=section-divider]')].map(s=>Math.round(s.getBoundingClientRect().top+scrollY)))", returnByValue=True)['result']['value']
        img = cmd('Page.captureScreenshot', format='png', captureBeyondViewport=True)['data']
        name = f"{tag}_{theme}_{path}"
        open(os.path.join(OUT, name + '.png'), 'wb').write(base64.b64decode(img))
        open(os.path.join(OUT, name + '.json'), 'w').write(b)
        print(name, th, h, b)
ws.close(); p.kill()


def medir(tag, pages):
    import numpy as np
    from PIL import Image
    for theme in ["dark", "light"]:
        mx = 0
        for pg in pages:
            im = np.asarray(Image.open(os.path.join(OUT, f"{tag}_{theme}_{pg}.png")).convert("L"), dtype=float)
            rows = im.mean(axis=1)
            for y in json.load(open(os.path.join(OUT, f"{tag}_{theme}_{pg}.json"))):
                if 4 < y < len(rows) - 4:
                    mx = max(mx, max(abs(rows[k + 1] - rows[k]) for k in range(y - 3, y + 3)))
        print(theme, "salto maximo en bordes:", round(mx, 1))


medir(tag, pages)
