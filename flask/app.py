from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/cv-linkedin", methods=["POST"])
def index_cv():
  try: 
    link_linkedin = request.json["link_linkedin"]

    return jsonify({"Message": link_linkedin})
  except:
    return jsonify({"Message": "Error, no se pudo procesar correctamente el link ingresado. Favor de volver a intentar."}), 400