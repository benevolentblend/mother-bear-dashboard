from flask import Flask
import json

app = Flask(__name__)

@app.route('/')
def helloworld():
    return json.dumps({'success': True, 'message':'Hello World!'})
