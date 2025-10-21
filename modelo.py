# ==========================================================
# 🔬 Entrenamiento de un modelo Deep Learning (MobileNetV2)
# Proyecto: Clasificación de enfermedades de la piel
# Integrantes:
#Aquino Sandoval Kenya Xiomara 
#Aracayo Mamani Jhon Marco 
#Canaza Paucara Juan Diego 
#Castro Callo Vanesa Yhoselin 
#holaa
# ==========================================================

import os
import tensorflow as tf
from tensorflow.keras import layers, models

# ==========================================================
# 🧩 1️⃣ CONFIGURACIÓN INICIAL
# ==========================================================

# Ruta base del dataset
base_dir = "dataset_skin"

# Parámetros de imagen y entrenamiento
img_size = (224, 224)       # Tamaño de entrada compatible con MobileNetV2
batch_size = 128            # Número de imágenes por lote
epochs = 50                 # Número de iteraciones completas sobre el dataset

# ==========================================================
# ⚙️ 2️⃣ CONFIGURACIÓN DE HARDWARE (GPU RTX 4070)
# ==========================================================

print("\n🔍 Verificando GPUs disponibles...")
gpus = tf.config.list_physical_devices("GPU")
print("📦 Dispositivos detectados:", gpus)

if gpus:
    try:
        # Se fuerza a TensorFlow a usar solo la GPU NVIDIA RTX 4070 (índice 0)
        tf.config.set_visible_devices(gpus[0], "GPU")
        tf.config.experimental.set_memory_growth(gpus[0], True)
        print(f"✅ GPU activa: {gpus[0].name}")
    except Exception as e:
        print("⚠️ Error al configurar GPU:", e)
else:
    print("❌ No se detectó GPU, se entrenará en CPU.")

# Desactivar optimizaciones de oneDNN para reducir carga en CPU
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

# ==========================================================
# 📂 3️⃣ CARGA Y PREPROCESAMIENTO DEL DATASET
# ==========================================================

print("\n📂 Cargando dataset dermatológico...")

# División automática del dataset (80% entrenamiento, 20% validación)
train_raw = tf.keras.utils.image_dataset_from_directory(
    base_dir,
    validation_split=0.2,
    subset="training",
    seed=123,
    image_size=img_size,
    batch_size=batch_size
)

val_raw = tf.keras.utils.image_dataset_from_directory(
    base_dir,
    validation_split=0.2,
    subset="validation",
    seed=123,
    image_size=img_size,
    batch_size=batch_size
)

# Guardamos las clases detectadas
class_names = train_raw.class_names
print("🧩 Clases detectadas:", class_names)

# Normalización de píxeles y pipeline optimizado (usa CPU + GPU en paralelo)
train_ds = (
    train_raw.map(lambda x, y: (x / 255.0, y))
    .cache()
    .prefetch(tf.data.AUTOTUNE)
)

val_ds = (
    val_raw.map(lambda x, y: (x / 255.0, y))
    .cache()
    .prefetch(tf.data.AUTOTUNE)
)

# ==========================================================
# 🧠 4️⃣ CONSTRUCCIÓN DEL MODELO CON TRANSFER LEARNING
# ==========================================================

print("\n🧠 Construyendo modelo MobileNetV2 (Transfer Learning)...")

# Cargamos MobileNetV2 preentrenado en ImageNet
base_model = tf.keras.applications.MobileNetV2(
    input_shape=img_size + (3,),
    include_top=False,       # Quitamos la capa final de clasificación de ImageNet
    weights="imagenet"       # Usamos pesos preentrenados
)

# Congelamos las capas convolucionales base (no se reentrenan)
base_model.trainable = False

# Añadimos nuevas capas densas (clasificador específico dermatológico)
model = models.Sequential([
    base_model,                                 # Red convolucional base
    layers.GlobalAveragePooling2D(),            # Reduce dimensionalidad
    layers.Dense(256, activation="relu"),       # Capa oculta
    layers.Dropout(0.3),                        # Regularización
    layers.Dense(len(class_names), activation="softmax")  # Capa de salida
])

# Compilación del modelo con hiperparámetros óptimos
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-4),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

print("\n✅ Modelo compilado correctamente.")
print("🧾 Arquitectura del modelo:")
model.summary()

# ==========================================================
# 🧮 5️⃣ CALLBACKS (Control Inteligente del Entrenamiento)
# ==========================================================

callbacks = [
    # Detiene el entrenamiento cuando la precisión de validación deja de mejorar
    tf.keras.callbacks.EarlyStopping(
        monitor="val_accuracy",
        patience=5,
        restore_best_weights=True
    ),
    # Guarda automáticamente el mejor modelo encontrado
    tf.keras.callbacks.ModelCheckpoint(
        "modelo_piel_best.h5",
        save_best_only=True,
        monitor="val_accuracy"
    )
]

# ==========================================================
# 🚀 6️⃣ ENTRENAMIENTO EN GPU RTX 4070 (DirectML)
# ==========================================================

print("\n🚀 Entrenando modelo en GPU RTX 4070 (DirectML)...\n")

with tf.device("/device:DML:0"):  # Ejecutar explícitamente en GPU DirectML
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=epochs,
        callbacks=callbacks,
        verbose=1
    )

# ==========================================================
# 💾 7️⃣ GUARDADO Y VERIFICACIÓN FINAL
# ==========================================================

# Guardar modelo final (el más preciso tras validación)
model.save("modelo_piel_final.h5")
print("\n✅ Entrenamiento completado. Modelo guardado como 'modelo_piel_final.h5'")

# Confirmar GPU activa
print("\n💪 GPU usada durante el entrenamiento:")
print(tf.config.list_logical_devices("GPU"))

# ==========================================================
# 📊 8️⃣ EVALUACIÓN FINAL (Opcional)
# ==========================================================
# Puedes activar este bloque para evaluar la precisión final en validación
"""
loss, acc = model.evaluate(val_ds)
print(f"\n📈 Precisión final del modelo: {acc*100:.2f}%")
print(f"📉 Pérdida final: {loss:.4f}")
"""
