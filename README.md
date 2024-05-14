# Sipariş Yönetimi Uygulaması

Bu uygulama, siparişlerinizi yönetmek için kullanabileceğiniz bir arayüze sahiptir. Siparişlerinizi sürükle-bırak yöntemiyle farklı durumlar arasında taşıyabilir, kurye atayabilir ve teslimat durumlarını güncelleyebilirsiniz.

## Başlarken

Bu talimatlar, uygulamanın yerel bir makinede nasıl çalıştırılacağını ve geliştirileceğini açıklar.

### Gereksinimler

Uygulamayı çalıştırmak için bilgisayarınızda aşağıdaki yazılımların yüklü olması gerekir:

- Node.js
- npm veya yarn
- Bir JSON sunucusu (örneğin, json-server)

### Kurulum
Server Başlatma
```bash
npx json-server --watch src/services/db.json --port 3001
```
