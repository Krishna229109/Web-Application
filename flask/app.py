from flask import Flask, request, redirect, url_for, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__ , template_folder="template")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'  # Use SQLite as an example
db = SQLAlchemy(app)

# Define a model for the User database table
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        with app.app_context():
            new_user = User(username=username, password=password)
            db.session.add(new_user)
            db.session.commit()

        return redirect(url_for('store_and_print_data'))
    return render_template("chatbot.html")

@app.route('/store_and_print_data', methods=['GET'])
def store_and_print_data():
    
    return render_template("h.html")
    # with app.app_context():
    #     users = User.query.all()
    # table = "<table><tr><th>ID</th><th>Username</th><th>Password</th></tr>"
    # for user in users:
    #     table += f"<tr><td>{user.id}</td><td>{user.username}</td><td>{user.password}</td></tr>"
    # table += "</table>"
    # return table

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)