-- ==============================================================================
-- ESQUEMA BANCO DE DADOS POSTGRESQL - FTTRESP
-- ==============================================================================

-- Tabela de Configurações Gerais do Site
CREATE TABLE IF NOT EXISTS site_settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'default',
    data JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Usuários / Operadores Admin
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(100) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name VARCHAR(150),
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Notícias
CREATE TABLE IF NOT EXISTS news (
    id VARCHAR(100) PRIMARY KEY,
    title TEXT NOT NULL,
    category VARCHAR(100),
    summary TEXT,
    content TEXT,
    image_url TEXT,
    file_url TEXT,
    date VARCHAR(20),
    author VARCHAR(150),
    status VARCHAR(50) DEFAULT 'PUBLICADO',
    views INT DEFAULT 0,
    wa_shares INT DEFAULT 0,
    fb_shares INT DEFAULT 0,
    link_copies INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela dos 97 Sindicatos Filiados
CREATE TABLE IF NOT EXISTS unions (
    id VARCHAR(100) PRIMARY KEY,
    name TEXT NOT NULL,
    cnpj VARCHAR(30),
    city VARCHAR(100),
    region VARCHAR(100),
    category TEXT,
    address TEXT,
    cep VARCHAR(20),
    phone VARCHAR(100),
    email VARCHAR(150),
    president VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Jornais / Boletins PDF
CREATE TABLE IF NOT EXISTS jornais (
    id VARCHAR(100) PRIMARY KEY,
    title TEXT NOT NULL,
    category VARCHAR(100),
    summary TEXT,
    image_url TEXT,
    file_url TEXT,
    date VARCHAR(20),
    status VARCHAR(50) DEFAULT 'PUBLICADO',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Convenções Coletivas / Acordos
CREATE TABLE IF NOT EXISTS agreements (
    id VARCHAR(100) PRIMARY KEY,
    title TEXT NOT NULL,
    sector VARCHAR(100),
    year VARCHAR(20),
    union_name VARCHAR(150),
    file_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Canais de Web TV
CREATE TABLE IF NOT EXISTS tv_channels (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100),
    current_show TEXT,
    default_video_url TEXT,
    is_live BOOLEAN DEFAULT FALSE,
    show_on_home BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Letreiros / Tickers da TV
CREATE TABLE IF NOT EXISTS tv_tickers (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(100),
    message TEXT NOT NULL,
    target VARCHAR(100),
    hours VARCHAR(50),
    status VARCHAR(50) DEFAULT 'ATIVO AGORA',
    speed VARCHAR(20) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Categorias
CREATE TABLE IF NOT EXISTS categorias (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
