# PHP POS Print (Local Server)

**Aplicação PHP [php](http://php.net/) para imprimir em impressoras térmicas locais.**

### Instalação

Para clonar e executar este repositório, você precisará:
[git](https://git-scm.com)
[php](http://php.net/)
[composer](https://getcomposer.org/)

Habilitar extensões PHP:

Abrir o arquivo `php.ini` e remover o `;` da linha `extension=gd2`

Comandos para instalar:

```bash

# Entrar no repositório
cd ppp

# Instalar dependências
composer install

# Iniciar servidor
php server.php

# Iniciar aplicação para configurar impressoras
php -S localhost:8000 -t app/
```

Na próxima vez, você pode simplesmente executar `php server.php` na linha de comando OU o arquivo `server.sh` para iniciar o servidor.

O servidor rodará na porta 6441 ( ws://localhost:6441 ) e ficará escutando por novos trabalhos de impressão.

---

### Impressora locais

O servidor tentará usar as impressoras locais se nenhuma impressora for fornecida.
Você pode acessar o aplicativo local do seu URL do servidor da web local ou simplesmente executar `php -S localhost:8000 -t app/` e acessar o aplicativo no navegador http://localhost:8000

**Funcionalidades Aplicativo**

- Página principal `index.php` para atualizar suas impressoras padrão
- Página impressoras `printers.php` para listar todas as suas impressoras
- Página adicionar impressora `add_printer.php` para adicionar nova impressora

As configurações locais serão salvas no arquivo `database/data.json`.
