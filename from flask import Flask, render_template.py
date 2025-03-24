from flask import Flask, render_template, jsonify, request
import json
import os
import random

app = Flask(__name__)

# Lista de perguntas
perguntas = [
    {
        "question": "Qual é a capital do Brasil?",
        "options": ["Rio de Janeiro", "Brasília", "São Paulo", "Belo Horizonte"],
        "answer": "B"
    },
    {
        "question": "Quem pintou a Mona Lisa?",
        "options": ["Van Gogh", "Picasso", "Leonardo da Vinci", "Monet"],
        "answer": "C"
    },
    {
        "question": "Qual o maior planeta do sistema solar?",
        "options": ["Terra", "Marte", "Júpiter", "Saturno"],
        "answer": "C"
    },
    {
        "question": "Em que ano ocorreu a independência do Brasil?",
        "options": ["1808", "1822", "1889", "1500"],
        "answer": "B"
    },
    {
        "question": "Qual o elemento químico mais abundante no universo?",
        "options": ["Oxigênio", "Carbono", "Hidrogênio", "Hélio"],
        "answer": "C"
    },
    {
        "question": "Qual animal é conhecido como o rei da selva?",
        "options": ["Tigre", "Leão", "Elefante", "Gorila"],
        "answer": "B"
    },
    {
        "question": "Qual é o maior oceano da Terra?",
        "options": ["Atlântico", "Índico", "Ártico", "Pacífico"],
        "answer": "D"
    },
    {
        "question": "Qual é o menor país do mundo?",
        "options": ["Mônaco", "Nauru", "Vaticano", "Liechtenstein"],
        "answer": "C"
    },
    {
        "question": "Quantos ossos tem o corpo humano adulto?",
        "options": ["206", "300", "186", "250"],
        "answer": "A"
    },
    {
        "question": "Qual é a montanha mais alta do mundo?",
        "options": ["Monte Everest", "K2", "Monte Fuji", "Monte Kilimanjaro"],
        "answer": "A"
    }
]

# Criar arquivo de pontuações se não existir
def init_scores():
    if not os.path.exists('scores.json'):
        with open('scores.json', 'w') as f:
            json.dump([], f)

# Página principal
@app.route('/')
def index():
    return render_template('index.html')

# API para obter perguntas
@app.route('/api/questions', methods=['GET'])
def get_questions():
    # Embaralhar perguntas para cada jogo
    shuffled_questions = random.sample(perguntas, 10)
    return jsonify(shuffled_questions)

# API para salvar pontuação
@app.route('/api/save_score', methods=['POST'])
def save_score():
    data = request.json
    name = data.get('name', 'Anônimo')
    score = data.get('score', 0)
    correct_answers = data.get('correct_answers', 0)
    
    try:
        with open('scores.json', 'r') as f:
            scores = json.load(f)
        
        scores.append({
            'name': name,
            'score': score,
            'correct_answers': correct_answers,
            'date': request.json.get('date', '')
        })
        
        # Ordenar por pontuação
        scores = sorted(scores, key=lambda x: x['score'], reverse=True)
        
        with open('scores.json', 'w') as f:
            json.dump(scores, f)
            
        return jsonify({'success': True, 'message': 'Pontuação salva com sucesso!'})
    
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

# API para obter ranking
@app.route('/api/ranking', methods=['GET'])
def get_ranking():
    try:
        with open('scores.json', 'r') as f:
            scores = json.load(f)
        
        # Retornar apenas os 10 melhores
        return jsonify(scores[:10])
    
    except Exception as e:
        return jsonify([]), 200

# Inicializar o arquivo de pontuações
init_scores()

if __name__ == '__main__':
    app.run(debug=True)