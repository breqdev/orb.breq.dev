from flask import Flask, send_file, request
import requests

app = Flask(__name__)


@app.route("/")
def index():
    return send_file("static/index.html")


@app.route("/get")
def get_color():
    response = requests.get(
        "https://homeassistant.home.breq.dev/api/states/light.orb",
        headers={
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI0ODZkMThlYjE0ZGY0ODZjYjcxNzNkNTk1OTZhNGQzYSIsImlhdCI6MTc0NTg5OTY2NCwiZXhwIjoyMDYxMjU5NjY0fQ.dMLfC1Qm_F71ns09rDiYDvimLabowiYufKmneptGzMA",
            "Content-Type": "application/json",
        },
    )

    if not response.ok:
        return "", response.status_code

    payload = response.json()
    red, green, blue = payload["attributes"]["rgb_color"]

    return (
        "#"
        + bytes(
            [
                int(round(red * 255)),
                int(round(green * 255)),
                int(round(blue * 255)),
            ]
        ).hex()
    )


@app.route("/set", methods=["POST"])
def set_color():
    hex_color = request.args["color"]
    red, green, blue = bytes.fromhex(hex_color.removeprefix("#"))

    resp = requests.post(
        "https://homeassistant.home.breq.dev/api/services/light/turn_on",
        headers={
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI0ODZkMThlYjE0ZGY0ODZjYjcxNzNkNTk1OTZhNGQzYSIsImlhdCI6MTc0NTg5OTY2NCwiZXhwIjoyMDYxMjU5NjY0fQ.dMLfC1Qm_F71ns09rDiYDvimLabowiYufKmneptGzMA",
            "Content-Type": "application/json",
        },
        json={
            "entity_id": "light.orb",
            "rgb_color": [red, green, blue],
        },
    )

    return "", resp.status_code


app.run()
