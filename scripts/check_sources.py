"""Optional development-time HTTP audit. Requires Python 3 and curl; never runs in the app.
Reads literal URLs from the checked-in source registry. Writes status metadata only.
HTTP results do not replace editorial verification, and some sites block automated clients.
"""
import concurrent.futures
import json
import pathlib
import re
import subprocess

project_root = pathlib.Path(__file__).resolve().parent.parent
registry = (project_root / 'src/data/sources.ts').read_text()
urls = list(dict.fromkeys(re.findall(r'"url":\s*"(https://[^"]+)"', registry)))

def check(url):
    result = subprocess.run(
        ['curl', '-L', '--max-time', '35', '-sS', '-A', 'Mozilla/5.0',
         '-o', '/dev/null', '-w', '%{http_code}\n%{url_effective}', url],
        capture_output=True, text=True,
    )
    if result.returncode:
        return {'url': url, 'status': 'unverified', 'error': result.stderr.strip()}
    status, final_url = result.stdout.split('\n', 1)
    return {'url': url, 'status': int(status), 'finalUrl': final_url}

if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        results = list(pool.map(check, urls))
    output = project_root / 'research/link-audit-latest.json'
    output.write_text(json.dumps(results, indent=2))
    print(f'Checked {len(results)} URLs; results: {output}')
