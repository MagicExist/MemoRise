from openai import OpenAI
from django.conf import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

def generate_flashcards(user_text: str):
    prompt = f"""
    Genera exactamente 3 flashcards educativas en formato JSON puro.
    IMPORTANTE:
    - Responde siempre en español.
    - No incluyas explicaciones ni texto extra fuera del JSON.
    - Devuelve una lista JSON de objetos, cada uno con las claves "front" (pregunta) y "back" (respuesta).

    Ejemplo válido:
    [
        {{ "front": "¿Qué es Python?", "back": "Un lenguaje de programación de alto nivel." }},
        {{ "front": "¿Quién creó Python?", "back": "Guido van Rossum en 1991." }}
    ]

    Texto del usuario: "{user_text}"
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",  # modelo barato y rápido
        messages=[
            {"role": "system", "content": "Eres un generador de flashcards. Siempre responde SOLO en JSON válido."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    return response.choices[0].message.content