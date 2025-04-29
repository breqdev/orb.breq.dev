from flask import Flask, send_file, request
import requests
from dotenv import load_dotenv
import os


load_dotenv()
TOKEN = os.environ["HOMEASSISTANT_TOKEN"]

app = Flask(__name__)


@app.route("/")
def index():
    return send_file("static/index.html")


@app.route("/get")
def get_color():
    response = requests.get(
        "https://homeassistant.home.breq.dev/api/states/light.orb",
        headers={
            "Authorization": "Bearer " + TOKEN,
            "Content-Type": "application/json",
        },
    )

    if not response.ok:
        return "", response.status_code

    payload = response.json()
    red, green, blue = payload["attributes"]["rgb_color"]

    return "#" + bytes([red, green, blue]).hex()


@app.route("/set", methods=["POST"])
def set_color():
    hex_color = request.args["color"]
    red, green, blue = bytes.fromhex(hex_color.removeprefix("#"))

    resp = requests.post(
        "https://homeassistant.home.breq.dev/api/services/light/turn_on",
        headers={
            "Authorization": "Bearer " + TOKEN,
            "Content-Type": "application/json",
        },
        json={
            "entity_id": "light.orb",
            "rgb_color": [red, green, blue],
        },
    )

    return "", resp.status_code
