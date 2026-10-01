import json
from pathlib import Path
# SANDHU
BASE=Path(__file__).resolve().parent/'data'; BASE.mkdir(exist_ok=True)
def load_data(name):
    p=BASE/name
    if not p.exists(): p.write_text('[]',encoding='utf-8'); return []
    try: return json.loads(p.read_text(encoding='utf-8'))
    except (json.JSONDecodeError,OSError): return []
def save_data(name,data):
    (BASE/name).write_text(json.dumps(data,indent=4,ensure_ascii=False),encoding='utf-8'); return True
# SANDHU