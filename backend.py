import requests

resp = requests.get(
    "https://homeassistant.home.breq.dev/api/states/light.orb",
    headers={
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI0ODZkMThlYjE0ZGY0ODZjYjcxNzNkNTk1OTZhNGQzYSIsImlhdCI6MTc0NTg5OTY2NCwiZXhwIjoyMDYxMjU5NjY0fQ.dMLfC1Qm_F71ns09rDiYDvimLabowiYufKmneptGzMA",
        "Content-Type": "application/json",
    },
)

print(resp.content)
