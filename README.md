# 🚗 AutoHub - Otomotiv Yönetim Sistemi

AutoHub, araç kiralama ve satış işlemlerini yönetmek için geliştirilmiş kapsamlı bir **fullstack** web uygulamasıdır.

---

## 📋 İçindekiler

- [Teknoloji Yığını](#-teknoloji-yığını)
- [Proje Mimarisi](#-proje-mimarisi)
- [Özellikler](#-özellikler)
- [Kurulum](#-kurulum)
- [Docker ile Çalıştırma](#-docker-ile-çalıştırma)
- [Kubernetes ile Dağıtım](#-kubernetes-ile-dağıtım)
- [API Dokümantasyonu](#-api-dokümantasyonu)
- [Ortam Değişkenleri](#-ortam-değişkenleri)

---

## 🛠 Teknoloji Yığını

### Backend
| Teknoloji | Sürüm | Kullanım |
|-----------|-------|---------|
| Java | 17 | Programlama dili |
| Spring Boot | 3.2 | Uygulama çatısı |
| Spring Security + JWT | - | Kimlik doğrulama |
| Spring Data JPA | - | ORM katmanı |
| PostgreSQL | 15 | Ana veritabanı |
| Redis | 7 | Önbellekleme |
| Apache Kafka | 3.5 | Mesajlaşma platformu |
| Elasticsearch | 8.11 | Arama motoru |
| Spring Cloud Gateway | - | API Gateway |
| Consul | 1.16 | Servis keşfi |
| ActiveMQ Artemis | - | Mesaj kuyruğu |
| Resilience4J | 2.1 | Devre kesici |
| Zipkin | 3 | Dağıtık izleme |
| Prometheus + Grafana | - | İzleme/Metrik |
| Maven | 3.9 | Build aracı |

### Frontend
| Teknoloji | Sürüm | Kullanım |
|-----------|-------|---------|
| Angular | 17 | Frontend çatısı |
| TypeScript | 5.2 | Programlama dili |
| Angular Material | 17 | UI bileşen kütüphanesi |
| RxJS | 7.8 | Reaktif programlama |
| SCSS | - | Stil dili |

### DevOps
| Teknoloji | Kullanım |
|-----------|---------|
| Docker | Konteynerizasyon |
| Docker Compose | Çoklu konteyner yönetimi |
| Kubernetes | Container orkestrasyon |
| Nginx | Frontend web sunucusu |

---

## 🏗 Proje Mimarisi

```
autohub/
├── backend/                    # Spring Boot Backend
│   ├── src/main/java/com/autohub/
│   │   ├── config/            # Konfigürasyon sınıfları (Redis, Kafka, JPA)
│   │   ├── controller/        # REST API Controller'ları
│   │   ├── dto/               # Data Transfer Objects
│   │   │   ├── request/       # İstek DTO'ları
│   │   │   └── response/      # Yanıt DTO'ları
│   │   ├── entity/            # JPA Entity sınıfları
│   │   ├── exception/         # Özel exception sınıfları
│   │   ├── kafka/             # Kafka producer/consumer
│   │   │   ├── producer/
│   │   │   └── consumer/
│   │   ├── repository/        # Spring Data JPA repository'leri
│   │   ├── security/          # JWT ve Spring Security
│   │   └── service/           # İş mantığı servisleri
│   │       └── impl/          # Servis implementasyonları
│   ├── src/main/resources/
│   │   ├── application.yml    # Uygulama konfigürasyonu
│   │   └── db/migration/      # Flyway SQL migration'ları
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/                   # Angular Frontend
│   ├── src/app/
│   │   ├── components/        # Paylaşılan bileşenler
│   │   ├── guards/            # Route guard'ları (AuthGuard, RoleGuard)
│   │   ├── interceptors/      # HTTP interceptor'ları (JWT)
│   │   ├── models/            # TypeScript interface/enum tanımları
│   │   ├── modules/           # Lazy-loaded özellik modülleri
│   │   │   ├── auth/          # Login, Register
│   │   │   ├── dashboard/     # Ana sayfa istatistikleri
│   │   │   ├── vehicle/       # Araç yönetimi
│   │   │   ├── brand/         # Marka yönetimi
│   │   │   ├── customer/      # Müşteri yönetimi
│   │   │   └── transaction/   # İşlem yönetimi
│   │   └── services/          # API servis sınıfları
│   ├── Dockerfile
│   └── nginx.conf
│
├── k8s/                       # Kubernetes manifest dosyaları
├── monitoring/                # Prometheus konfigürasyonu
├── docker-compose.yml         # Geliştirme ortamı
└── README.md
```

### Katmanlı Mimari (Clean Architecture)

```
┌─────────────────────────────────────┐
│         Controller Katmanı          │  ← HTTP isteklerini alır, yanıt döner
│  (REST API Endpoint'leri)           │
├─────────────────────────────────────┤
│          Service Katmanı            │  ← İş mantığı, doğrulama
│  (İş Kuralları, Cache, Kafka)       │
├─────────────────────────────────────┤
│        Repository Katmanı           │  ← Veritabanı işlemleri (JPA)
│  (Veri Erişim Katmanı)              │
├─────────────────────────────────────┤
│      Veritabanı / Servisler         │  ← PostgreSQL, Redis, Elasticsearch
└─────────────────────────────────────┘
```

---

## ✨ Özellikler

### Araç Yönetimi
- ✅ Araç ekleme, güncelleme, silme (soft delete)
- ✅ Plaka, VIN numarası ile arama
- ✅ Marka, model, yıl, fiyat bazlı filtreleme
- ✅ Elasticsearch ile full-text arama
- ✅ Araç durumu yönetimi (Müsait, Kiralandı, Satıldı, Bakımda)
- ✅ Araç fotoğrafları ve özellikler

### Marka & Model Yönetimi
- ✅ Araç markası ekleme ve yönetimi
- ✅ Marka-model hiyerarşisi
- ✅ Araç tipi, yakıt tipi, vites tipi yönetimi

### Müşteri Yönetimi
- ✅ Bireysel ve kurumsal müşteri kaydı
- ✅ TC Kimlik numarası doğrulaması
- ✅ Ehliyet geçerlilik kontrolü
- ✅ Müşteri geçmişi

### Kiralama & Satış İşlemleri
- ✅ Kiralama başlangıç/bitiş tarihleri
- ✅ Gecikmiş kiralama tespiti
- ✅ Otomatik KDV hesaplaması
- ✅ İndirim ve ek ücret yönetimi
- ✅ İşlem numarası otomatik üretimi

### Güvenlik
- ✅ JWT tabanlı kimlik doğrulama
- ✅ Role-based access control (RBAC)
- ✅ BCrypt şifre hashleme
- ✅ Hesap kilitleme (5 başarısız deneme)
- ✅ HTTP interceptor ile token yönetimi

### Altyapı
- ✅ Redis önbellekleme
- ✅ Kafka event streaming
- ✅ Resilience4J circuit breaker
- ✅ Zipkin dağıtık izleme
- ✅ Prometheus + Grafana monitoring
- ✅ Consul servis keşfi
- ✅ Flyway veritabanı migration

---

## 🚀 Kurulum

### Gereksinimler

- Java 17+
- Node.js 20+
- Docker & Docker Compose
- Maven 3.9+

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/m-ogur34/autohub.git
cd autohub
```

### 2. Yerel Geliştirme (Manuel)

**Backend:**
```bash
cd backend
# Bağımlılıkları indir ve derle
mvn clean install -DskipTests

# Uygulamayı başlat
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm start
```

Uygulama şu adreslerde çalışır:
- Frontend: http://localhost:4200
- Backend API: http://localhost:8080/api
- Actuator: http://localhost:8080/api/actuator/health

---

## 🐳 Docker ile Çalıştırma

Tüm servisleri tek komutla başlatın:

```bash
# Tüm servisleri başlat (arka planda)
docker-compose up -d

# Logları görüntüle
docker-compose logs -f backend

# Servislerin durumunu kontrol et
docker-compose ps

# Durdur
docker-compose down

# Durdur ve volume'ları sil (veri temizleme)
docker-compose down -v
```

### Servis Adresleri

| Servis | Adres |
|--------|-------|
| Frontend | http://localhost:80 |
| Backend API | http://localhost:8080/api |
| Grafana | http://localhost:3000 (admin/admin123) |
| Prometheus | http://localhost:9090 |
| Consul UI | http://localhost:8500 |
| Zipkin UI | http://localhost:9411 |
| ActiveMQ Konsol | http://localhost:8161 (admin/admin) |
| Elasticsearch | http://localhost:9200 |

---

## ☸️ Kubernetes ile Dağıtım

```bash
# Namespace oluştur
kubectl apply -f k8s/namespace.yaml

# Veritabanı dağıt
kubectl apply -f k8s/postgres-deployment.yaml

# Backend dağıt
kubectl apply -f k8s/backend-deployment.yaml

# Frontend dağıt
kubectl apply -f k8s/frontend-deployment.yaml

# Tüm pod'ların durumunu kontrol et
kubectl get pods -n autohub

# Backend loglarını görüntüle
kubectl logs -f deployment/autohub-backend -n autohub
```

---

## 📖 API Dokümantasyonu

### Kimlik Doğrulama

```http
# Giriş
POST /api/auth/login
Content-Type: application/json
{
  "username": "admin",
  "password": "Admin@123!"
}

# Kayıt
POST /api/auth/register
Content-Type: application/json
{
  "username": "kullanici",
  "email": "kullanici@ornek.com",
  "password": "Sifre@123",
  "confirmPassword": "Sifre@123"
}

# Token Yenileme
POST /api/auth/refresh
X-Refresh-Token: <refresh_token>
```

### Araç Endpoint'leri

```http
# Tüm araçları listele
GET /api/vehicles?page=0&size=10&sort=price,asc

# Araç detayı
GET /api/vehicles/{id}

# Yeni araç ekle (ADMIN/MANAGER)
POST /api/vehicles
Authorization: Bearer <token>

# Araç güncelle
PUT /api/vehicles/{id}
Authorization: Bearer <token>

# Araç sil
DELETE /api/vehicles/{id}
Authorization: Bearer <token>

# Durum güncelle
PATCH /api/vehicles/{id}/status?status=RENTED
Authorization: Bearer <token>

# Arama
GET /api/vehicles/search?q=toyota+corolla

# İstatistikler
GET /api/vehicles/stats
```

---

## 🔐 Ortam Değişkenleri

Backend için `.env` dosyası:

```env
# Veritabanı
DB_HOST=localhost
DB_PORT=5432
DB_NAME=autohub_db
DB_USERNAME=autohub_user
DB_PASSWORD=autohub_pass

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=redis_password

# Kafka
KAFKA_SERVERS=localhost:9092

# Elasticsearch
ES_URI=http://localhost:9200

# JWT (minimum 32 karakter, base64 encoded)
JWT_SECRET=YXV0b2h1Yi1zdXBlci1zZWNyZXQta2V5

# JWT süreleri (ms)
JWT_EXPIRATION=86400000
JWT_REFRESH_EXP=604800000
```

---

## 👤 Varsayılan Kullanıcılar

| Kullanıcı Adı | Şifre | Rol |
|--------------|-------|-----|
| admin | Admin@123! | ADMIN |

---

## 📊 Grafana Dashboard

Grafana'ya erişin: http://localhost:3000

- Kullanıcı: `admin`
- Şifre: `admin123`

Spring Boot uygulaması metrikleri otomatik olarak Prometheus'a gönderilir ve Grafana'da görselleştirilir.

---

## 🔄 OOP Prensipleri

Bu projede nesne yönelimli programlama prensipleri şu şekilde uygulanmıştır:

| Prensip | Uygulama |
|---------|----------|
| **Soyutlama** | `VehicleService` arayüzü, veritabanı detaylarını gizler |
| **Kapsülleme** | Entity sınıflarında `private` alanlar, getter/setter ile erişim |
| **Kalıtım** | Tüm Entity'ler `BaseEntity`'den miras alır |
| **Polimorfizm** | `UserDetails` implementasyonu, enum tabanlı davranış |

---

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

*AutoHub - Araç yönetimini kolaylaştırıyoruz* 🚗
