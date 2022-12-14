toc.dat                                                                                             0000600 0004000 0002000 00000074004 13776703066 0014463 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP       0    8        
         y            rental-movies-dump    10.15    10.15 i    }           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false         ~           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false                    0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false         ?           1262    67400    rental-movies-dump    DATABASE     ?   CREATE DATABASE "rental-movies-dump" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_El Salvador.1252' LC_CTYPE = 'Spanish_El Salvador.1252';
 $   DROP DATABASE "rental-movies-dump";
             postgres    false                     2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false         ?           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                     3079    12924    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false         ?           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1         ?            1259    67568    Invoices    TABLE     ?   CREATE TABLE public."Invoices" (
    id integer NOT NULL,
    total numeric(5,2) NOT NULL,
    "transactionDate" timestamp without time zone NOT NULL,
    "userId" integer
);
    DROP TABLE public."Invoices";
       public         camilo    false    3         ?            1259    67566    Invoices_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."Invoices_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Invoices_id_seq";
       public       camilo    false    3    217         ?           0    0    Invoices_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Invoices_id_seq" OWNED BY public."Invoices".id;
            public       camilo    false    216         ?            1259    67406 
   StateMovie    TABLE     g   CREATE TABLE public."StateMovie" (
    id integer NOT NULL,
    name character varying(20) NOT NULL
);
     DROP TABLE public."StateMovie";
       public         camilo    false    3         ?            1259    67409    StateMovie_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."StateMovie_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."StateMovie_id_seq";
       public       camilo    false    196    3         ?           0    0    StateMovie_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."StateMovie_id_seq" OWNED BY public."StateMovie".id;
            public       camilo    false    197         ?            1259    67545    TokensPassword    TABLE     ?   CREATE TABLE public."TokensPassword" (
    id integer NOT NULL,
    token character varying(100) NOT NULL,
    "createAt" timestamp without time zone NOT NULL,
    "userId" integer
);
 $   DROP TABLE public."TokensPassword";
       public         camilo    false    3         ?            1259    67543    TokensPassword_id_seq    SEQUENCE     ?   CREATE SEQUENCE public."TokensPassword_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."TokensPassword_id_seq";
       public       camilo    false    3    213         ?           0    0    TokensPassword_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."TokensPassword_id_seq" OWNED BY public."TokensPassword".id;
            public       camilo    false    212         ?            1259    67560    invoice_detail    TABLE     ?   CREATE TABLE public.invoice_detail (
    id integer NOT NULL,
    "returnDate" timestamp without time zone,
    price numeric(5,2) NOT NULL,
    "stateId" integer,
    "invoiceId" integer,
    "movieId" integer,
    quantity integer NOT NULL
);
 "   DROP TABLE public.invoice_detail;
       public         camilo    false    3         ?            1259    67558    invoice_detail_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.invoice_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.invoice_detail_id_seq;
       public       camilo    false    3    215         ?           0    0    invoice_detail_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.invoice_detail_id_seq OWNED BY public.invoice_detail.id;
            public       camilo    false    214         ?            1259    67411 
   migrations    TABLE     ?   CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.migrations;
       public         camilo    false    3         ?            1259    67417    migrations_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public       camilo    false    3    198         ?           0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
            public       camilo    false    199         ?            1259    67419    movies    TABLE     Y  CREATE TABLE public.movies (
    id integer NOT NULL,
    title character varying(30) NOT NULL,
    description character varying(1000) NOT NULL,
    poster character varying(100) NOT NULL,
    stock integer NOT NULL,
    "trailerLink" character varying(100) NOT NULL,
    "salePrice" numeric(5,2) NOT NULL,
    availability boolean NOT NULL
);
    DROP TABLE public.movies;
       public         camilo    false    3         ?            1259    67425    movies_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.movies_id_seq;
       public       camilo    false    3    200         ?           0    0    movies_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;
            public       camilo    false    201         ?            1259    67427    movies_likes_users    TABLE     l   CREATE TABLE public.movies_likes_users (
    "moviesId" integer NOT NULL,
    "usersId" integer NOT NULL
);
 &   DROP TABLE public.movies_likes_users;
       public         camilo    false    3         ?            1259    67430    movies_tags_tags    TABLE     i   CREATE TABLE public.movies_tags_tags (
    "moviesId" integer NOT NULL,
    "tagsId" integer NOT NULL
);
 $   DROP TABLE public.movies_tags_tags;
       public         camilo    false    3         ?            1259    67433    roles    TABLE     `   CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(10) NOT NULL
);
    DROP TABLE public.roles;
       public         camilo    false    3         ?            1259    67436    roles_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public       camilo    false    204    3         ?           0    0    roles_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
            public       camilo    false    205         ?            1259    67438    tags    TABLE     _   CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying(30) NOT NULL
);
    DROP TABLE public.tags;
       public         camilo    false    3         ?            1259    67441    tags_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.tags_id_seq;
       public       camilo    false    206    3         ?           0    0    tags_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;
            public       camilo    false    207         ?            1259    67443    tokens    TABLE     ?   CREATE TABLE public.tokens (
    id integer NOT NULL,
    token character varying NOT NULL,
    "createAt" timestamp without time zone NOT NULL,
    "userId" integer
);
    DROP TABLE public.tokens;
       public         camilo    false    3         ?            1259    67449    tokens_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.tokens_id_seq;
       public       camilo    false    3    208         ?           0    0    tokens_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.tokens_id_seq OWNED BY public.tokens.id;
            public       camilo    false    209         ?            1259    67451    users    TABLE     3  CREATE TABLE public.users (
    id integer NOT NULL,
    "firstName" character varying(30) NOT NULL,
    "lastName" character varying(30) NOT NULL,
    "userName" character varying(20) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    "roleId" integer
);
    DROP TABLE public.users;
       public         camilo    false    3         ?            1259    67454    users_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public       camilo    false    210    3         ?           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
            public       camilo    false    211         ?
           2604    67571    Invoices id    DEFAULT     n   ALTER TABLE ONLY public."Invoices" ALTER COLUMN id SET DEFAULT nextval('public."Invoices_id_seq"'::regclass);
 <   ALTER TABLE public."Invoices" ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    216    217    217         ?
           2604    67457    StateMovie id    DEFAULT     r   ALTER TABLE ONLY public."StateMovie" ALTER COLUMN id SET DEFAULT nextval('public."StateMovie_id_seq"'::regclass);
 >   ALTER TABLE public."StateMovie" ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    197    196         ?
           2604    67548    TokensPassword id    DEFAULT     z   ALTER TABLE ONLY public."TokensPassword" ALTER COLUMN id SET DEFAULT nextval('public."TokensPassword_id_seq"'::regclass);
 B   ALTER TABLE public."TokensPassword" ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    212    213    213         ?
           2604    67563    invoice_detail id    DEFAULT     v   ALTER TABLE ONLY public.invoice_detail ALTER COLUMN id SET DEFAULT nextval('public.invoice_detail_id_seq'::regclass);
 @   ALTER TABLE public.invoice_detail ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    215    214    215         ?
           2604    67458    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    199    198         ?
           2604    67459 	   movies id    DEFAULT     f   ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);
 8   ALTER TABLE public.movies ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    201    200         ?
           2604    67460    roles id    DEFAULT     d   ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    205    204         ?
           2604    67461    tags id    DEFAULT     b   ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);
 6   ALTER TABLE public.tags ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    207    206         ?
           2604    67462 	   tokens id    DEFAULT     f   ALTER TABLE ONLY public.tokens ALTER COLUMN id SET DEFAULT nextval('public.tokens_id_seq'::regclass);
 8   ALTER TABLE public.tokens ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    209    208         ?
           2604    67463    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    211    210         z          0    67568    Invoices 
   TABLE DATA               L   COPY public."Invoices" (id, total, "transactionDate", "userId") FROM stdin;
    public       camilo    false    217       2938.dat e          0    67406 
   StateMovie 
   TABLE DATA               0   COPY public."StateMovie" (id, name) FROM stdin;
    public       camilo    false    196       2917.dat v          0    67545    TokensPassword 
   TABLE DATA               K   COPY public."TokensPassword" (id, token, "createAt", "userId") FROM stdin;
    public       camilo    false    213       2934.dat x          0    67560    invoice_detail 
   TABLE DATA               n   COPY public.invoice_detail (id, "returnDate", price, "stateId", "invoiceId", "movieId", quantity) FROM stdin;
    public       camilo    false    215       2936.dat g          0    67411 
   migrations 
   TABLE DATA               ;   COPY public.migrations (id, "timestamp", name) FROM stdin;
    public       camilo    false    198       2919.dat i          0    67419    movies 
   TABLE DATA               q   COPY public.movies (id, title, description, poster, stock, "trailerLink", "salePrice", availability) FROM stdin;
    public       camilo    false    200       2921.dat k          0    67427    movies_likes_users 
   TABLE DATA               C   COPY public.movies_likes_users ("moviesId", "usersId") FROM stdin;
    public       camilo    false    202       2923.dat l          0    67430    movies_tags_tags 
   TABLE DATA               @   COPY public.movies_tags_tags ("moviesId", "tagsId") FROM stdin;
    public       camilo    false    203       2924.dat m          0    67433    roles 
   TABLE DATA               )   COPY public.roles (id, name) FROM stdin;
    public       camilo    false    204       2925.dat o          0    67438    tags 
   TABLE DATA               (   COPY public.tags (id, name) FROM stdin;
    public       camilo    false    206       2927.dat q          0    67443    tokens 
   TABLE DATA               A   COPY public.tokens (id, token, "createAt", "userId") FROM stdin;
    public       camilo    false    208       2929.dat s          0    67451    users 
   TABLE DATA               c   COPY public.users (id, "firstName", "lastName", "userName", email, password, "roleId") FROM stdin;
    public       camilo    false    210       2931.dat ?           0    0    Invoices_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Invoices_id_seq"', 70, true);
            public       camilo    false    216         ?           0    0    StateMovie_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."StateMovie_id_seq"', 4, true);
            public       camilo    false    197         ?           0    0    TokensPassword_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."TokensPassword_id_seq"', 16, true);
            public       camilo    false    212         ?           0    0    invoice_detail_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.invoice_detail_id_seq', 23, true);
            public       camilo    false    214         ?           0    0    migrations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.migrations_id_seq', 5, true);
            public       camilo    false    199         ?           0    0    movies_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.movies_id_seq', 35, true);
            public       camilo    false    201         ?           0    0    roles_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.roles_id_seq', 3, true);
            public       camilo    false    205         ?           0    0    tags_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.tags_id_seq', 5, true);
            public       camilo    false    207         ?           0    0    tokens_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.tokens_id_seq', 24, true);
            public       camilo    false    209         ?           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 20, true);
            public       camilo    false    211         ?
           2606    67465 %   tokens PK_3001e89ada36263dabf1fb6210a 
   CONSTRAINT     e   ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.tokens DROP CONSTRAINT "PK_3001e89ada36263dabf1fb6210a";
       public         camilo    false    208         ?
           2606    67565 -   invoice_detail PK_3d65640b01305b25702d2de67c4 
   CONSTRAINT     m   ALTER TABLE ONLY public.invoice_detail
    ADD CONSTRAINT "PK_3d65640b01305b25702d2de67c4" PRIMARY KEY (id);
 Y   ALTER TABLE ONLY public.invoice_detail DROP CONSTRAINT "PK_3d65640b01305b25702d2de67c4";
       public         camilo    false    215         ?
           2606    67467 /   movies_tags_tags PK_537bec4e832e964d92ae6cdd06b 
   CONSTRAINT     ?   ALTER TABLE ONLY public.movies_tags_tags
    ADD CONSTRAINT "PK_537bec4e832e964d92ae6cdd06b" PRIMARY KEY ("moviesId", "tagsId");
 [   ALTER TABLE ONLY public.movies_tags_tags DROP CONSTRAINT "PK_537bec4e832e964d92ae6cdd06b";
       public         camilo    false    203    203         ?
           2606    67550 -   TokensPassword PK_8593442423777c2c563d294e11f 
   CONSTRAINT     o   ALTER TABLE ONLY public."TokensPassword"
    ADD CONSTRAINT "PK_8593442423777c2c563d294e11f" PRIMARY KEY (id);
 [   ALTER TABLE ONLY public."TokensPassword" DROP CONSTRAINT "PK_8593442423777c2c563d294e11f";
       public         camilo    false    213         ?
           2606    67573 '   Invoices PK_89f2f5f3cb6dc35e50b7c6ab8c2 
   CONSTRAINT     i   ALTER TABLE ONLY public."Invoices"
    ADD CONSTRAINT "PK_89f2f5f3cb6dc35e50b7c6ab8c2" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public."Invoices" DROP CONSTRAINT "PK_89f2f5f3cb6dc35e50b7c6ab8c2";
       public         camilo    false    217         ?
           2606    67469 )   migrations PK_8c82d7f526340ab734260ea46be 
   CONSTRAINT     i   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.migrations DROP CONSTRAINT "PK_8c82d7f526340ab734260ea46be";
       public         camilo    false    198         ?
           2606    67471 )   StateMovie PK_8d9b1ac842f2f90e36d324d5263 
   CONSTRAINT     k   ALTER TABLE ONLY public."StateMovie"
    ADD CONSTRAINT "PK_8d9b1ac842f2f90e36d324d5263" PRIMARY KEY (id);
 W   ALTER TABLE ONLY public."StateMovie" DROP CONSTRAINT "PK_8d9b1ac842f2f90e36d324d5263";
       public         camilo    false    196         ?
           2606    67475 $   users PK_a3ffb1c0c8416b9fc6f907b7433 
   CONSTRAINT     d   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433";
       public         camilo    false    210         ?
           2606    67477 $   roles PK_c1433d71a4838793a49dcad46ab 
   CONSTRAINT     d   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.roles DROP CONSTRAINT "PK_c1433d71a4838793a49dcad46ab";
       public         camilo    false    204         ?
           2606    67479 1   movies_likes_users PK_c303bf0f90a0a47d14595aa26c5 
   CONSTRAINT     ?   ALTER TABLE ONLY public.movies_likes_users
    ADD CONSTRAINT "PK_c303bf0f90a0a47d14595aa26c5" PRIMARY KEY ("moviesId", "usersId");
 ]   ALTER TABLE ONLY public.movies_likes_users DROP CONSTRAINT "PK_c303bf0f90a0a47d14595aa26c5";
       public         camilo    false    202    202         ?
           2606    67481 %   movies PK_c5b2c134e871bfd1c2fe7cc3705 
   CONSTRAINT     e   ALTER TABLE ONLY public.movies
    ADD CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.movies DROP CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705";
       public         camilo    false    200         ?
           2606    67483 #   tags PK_e7dc17249a1148a1970748eda99 
   CONSTRAINT     c   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.tags DROP CONSTRAINT "PK_e7dc17249a1148a1970748eda99";
       public         camilo    false    206         ?
           2606    67552 -   TokensPassword REL_b31b080f8ebbb85c0cc8f7ea4e 
   CONSTRAINT     p   ALTER TABLE ONLY public."TokensPassword"
    ADD CONSTRAINT "REL_b31b080f8ebbb85c0cc8f7ea4e" UNIQUE ("userId");
 [   ALTER TABLE ONLY public."TokensPassword" DROP CONSTRAINT "REL_b31b080f8ebbb85c0cc8f7ea4e";
       public         camilo    false    213         ?
           2606    67485 $   users UQ_226bb9aa7aa8a69991209d58f59 
   CONSTRAINT     g   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName");
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59";
       public         camilo    false    210         ?
           2606    67487 $   users UQ_450a05c0c4de5b75ac8d34835b9 
   CONSTRAINT     e   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9" UNIQUE (password);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9";
       public         camilo    false    210         ?
           2606    67489 $   roles UQ_648e3f5447f725579d7d4ffdfb7 
   CONSTRAINT     a   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE (name);
 P   ALTER TABLE ONLY public.roles DROP CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7";
       public         camilo    false    204         ?
           2606    67491 $   users UQ_97672ac88f789774dd47f7c8be3 
   CONSTRAINT     b   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3";
       public         camilo    false    210         ?
           2606    67493 #   tags UQ_d90243459a697eadb8ad56e9092 
   CONSTRAINT     `   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE (name);
 O   ALTER TABLE ONLY public.tags DROP CONSTRAINT "UQ_d90243459a697eadb8ad56e9092";
       public         camilo    false    206         ?
           1259    67494    IDX_21863da94b41f8391153dfef95    INDEX     a   CREATE INDEX "IDX_21863da94b41f8391153dfef95" ON public.movies_tags_tags USING btree ("tagsId");
 4   DROP INDEX public."IDX_21863da94b41f8391153dfef95";
       public         camilo    false    203         ?
           1259    67495    IDX_3d8a15bfe2768dc681c83d3e59    INDEX     d   CREATE INDEX "IDX_3d8a15bfe2768dc681c83d3e59" ON public.movies_likes_users USING btree ("usersId");
 4   DROP INDEX public."IDX_3d8a15bfe2768dc681c83d3e59";
       public         camilo    false    202         ?
           1259    67496    IDX_5ca2153346a50348cec77c3201    INDEX     c   CREATE INDEX "IDX_5ca2153346a50348cec77c3201" ON public.movies_tags_tags USING btree ("moviesId");
 4   DROP INDEX public."IDX_5ca2153346a50348cec77c3201";
       public         camilo    false    203         ?
           1259    67497    IDX_f725e7469ee5220c6b2246e2dc    INDEX     e   CREATE INDEX "IDX_f725e7469ee5220c6b2246e2dc" ON public.movies_likes_users USING btree ("moviesId");
 4   DROP INDEX public."IDX_f725e7469ee5220c6b2246e2dc";
       public         camilo    false    202         ?
           2606    67503 /   movies_tags_tags FK_21863da94b41f8391153dfef953    FK CONSTRAINT     ?   ALTER TABLE ONLY public.movies_tags_tags
    ADD CONSTRAINT "FK_21863da94b41f8391153dfef953" FOREIGN KEY ("tagsId") REFERENCES public.tags(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.movies_tags_tags DROP CONSTRAINT "FK_21863da94b41f8391153dfef953";
       public       camilo    false    2764    203    206         ?
           2606    67508 $   users FK_368e146b785b574f42ae9e53d5e    FK CONSTRAINT     ?   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES public.roles(id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e";
       public       camilo    false    2760    210    204         ?
           2606    67513 1   movies_likes_users FK_3d8a15bfe2768dc681c83d3e59a    FK CONSTRAINT     ?   ALTER TABLE ONLY public.movies_likes_users
    ADD CONSTRAINT "FK_3d8a15bfe2768dc681c83d3e59a" FOREIGN KEY ("usersId") REFERENCES public.users(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.movies_likes_users DROP CONSTRAINT "FK_3d8a15bfe2768dc681c83d3e59a";
       public       camilo    false    202    2770    210         ?
           2606    67518 /   movies_tags_tags FK_5ca2153346a50348cec77c32013    FK CONSTRAINT     ?   ALTER TABLE ONLY public.movies_tags_tags
    ADD CONSTRAINT "FK_5ca2153346a50348cec77c32013" FOREIGN KEY ("moviesId") REFERENCES public.movies(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.movies_tags_tags DROP CONSTRAINT "FK_5ca2153346a50348cec77c32013";
       public       camilo    false    203    2750    200         ?
           2606    67589 '   Invoices FK_9c2859c28c8179e8e013cd091aa    FK CONSTRAINT     ?   ALTER TABLE ONLY public."Invoices"
    ADD CONSTRAINT "FK_9c2859c28c8179e8e013cd091aa" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE SET NULL;
 U   ALTER TABLE ONLY public."Invoices" DROP CONSTRAINT "FK_9c2859c28c8179e8e013cd091aa";
       public       camilo    false    210    217    2770         ?
           2606    67584 -   invoice_detail FK_9d771c6bbbc45c46a4ff0124fb5    FK CONSTRAINT     ?   ALTER TABLE ONLY public.invoice_detail
    ADD CONSTRAINT "FK_9d771c6bbbc45c46a4ff0124fb5" FOREIGN KEY ("movieId") REFERENCES public.movies(id) ON DELETE SET NULL;
 Y   ALTER TABLE ONLY public.invoice_detail DROP CONSTRAINT "FK_9d771c6bbbc45c46a4ff0124fb5";
       public       camilo    false    2750    215    200         ?
           2606    67553 -   TokensPassword FK_b31b080f8ebbb85c0cc8f7ea4eb    FK CONSTRAINT     ?   ALTER TABLE ONLY public."TokensPassword"
    ADD CONSTRAINT "FK_b31b080f8ebbb85c0cc8f7ea4eb" FOREIGN KEY ("userId") REFERENCES public.users(id);
 [   ALTER TABLE ONLY public."TokensPassword" DROP CONSTRAINT "FK_b31b080f8ebbb85c0cc8f7ea4eb";
       public       camilo    false    210    213    2770         ?
           2606    67574 -   invoice_detail FK_b7785e906895d2db9e558b11ce5    FK CONSTRAINT     ?   ALTER TABLE ONLY public.invoice_detail
    ADD CONSTRAINT "FK_b7785e906895d2db9e558b11ce5" FOREIGN KEY ("stateId") REFERENCES public."StateMovie"(id);
 Y   ALTER TABLE ONLY public.invoice_detail DROP CONSTRAINT "FK_b7785e906895d2db9e558b11ce5";
       public       camilo    false    215    196    2746         ?
           2606    67533 %   tokens FK_d417e5d35f2434afc4bd48cb4d2    FK CONSTRAINT     ?   ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.tokens DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2";
       public       camilo    false    2770    208    210         ?
           2606    67595 -   invoice_detail FK_d4843ef5fb0acb6a1ea470236c6    FK CONSTRAINT     ?   ALTER TABLE ONLY public.invoice_detail
    ADD CONSTRAINT "FK_d4843ef5fb0acb6a1ea470236c6" FOREIGN KEY ("invoiceId") REFERENCES public."Invoices"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.invoice_detail DROP CONSTRAINT "FK_d4843ef5fb0acb6a1ea470236c6";
       public       camilo    false    2784    217    215         ?
           2606    67538 1   movies_likes_users FK_f725e7469ee5220c6b2246e2dc4    FK CONSTRAINT     ?   ALTER TABLE ONLY public.movies_likes_users
    ADD CONSTRAINT "FK_f725e7469ee5220c6b2246e2dc4" FOREIGN KEY ("moviesId") REFERENCES public.movies(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.movies_likes_users DROP CONSTRAINT "FK_f725e7469ee5220c6b2246e2dc4";
       public       camilo    false    200    2750    202                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    2938.dat                                                                                            0000600 0004000 0002000 00000001515 13776703066 0014300 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        43	2.00	2021-01-09 13:54:20	2
44	2.00	2021-01-09 13:58:32	2
45	2.00	2021-01-09 13:59:31	2
46	2.00	2021-01-09 14:00:54	2
47	2.00	2021-01-09 14:05:41	2
48	2.00	2021-01-09 14:06:13	2
49	2.00	2021-01-09 14:13:50	2
50	2.00	2021-01-09 14:18:14	2
51	2.00	2021-01-09 14:35:24	2
52	2.00	2021-01-09 14:35:51	2
53	0.60	2021-01-09 14:37:38	2
54	2.00	2021-01-09 19:07:34	2
55	2.00	2021-01-09 19:08:06	2
56	2.00	2021-01-09 19:09:27	2
57	2.00	2021-01-09 19:10:11	2
58	2.00	2021-01-09 19:20:26	2
59	2.00	2021-01-09 19:21:49	2
60	0.60	2021-01-09 19:22:04	2
61	6.35	2021-01-10 10:10:44	2
62	6.35	2021-01-10 10:18:58	2
63	6.35	2021-01-10 10:20:24	2
64	0.60	2021-01-10 12:22:03	2
65	0.60	2021-01-10 12:23:07	2
66	0.60	2021-01-10 12:25:54	2
67	1.80	2021-01-10 12:29:20	2
68	1.80	2021-01-10 12:31:53	2
69	1.80	2021-01-10 12:32:43	2
70	1.80	2021-01-10 12:34:15	2
\.


                                                                                                                                                                                   2917.dat                                                                                            0000600 0004000 0002000 00000000047 13776703066 0014274 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	rent
2	buy
3	delayed
4	returned
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         2934.dat                                                                                            0000600 0004000 0002000 00000000005 13776703066 0014265 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           2936.dat                                                                                            0000600 0004000 0002000 00000001224 13776703066 0014273 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	\N	2.00	2	51	1	1
2	\N	2.00	2	52	1	1
3	2021-01-12 14:37:38	0.60	4	53	1	1
4	\N	2.00	2	54	1	1
5	\N	2.00	2	55	1	1
6	\N	2.00	2	56	1	1
7	\N	2.00	2	57	1	1
8	\N	2.00	2	58	1	1
9	\N	2.00	2	59	1	1
10	2021-01-12 19:22:04	0.60	1	60	1	1
11	\N	5.75	2	61	2	1
12	2021-01-13 10:10:44	0.60	1	61	1	1
13	\N	5.75	2	62	2	1
14	2021-01-13 10:18:58	0.60	1	62	1	1
15	\N	5.75	2	63	2	1
16	2021-01-13 10:20:24	0.60	1	63	1	1
17	2021-01-13 12:22:03	0.60	1	64	1	1
18	2021-01-13 12:23:07	0.60	4	65	1	1
19	2021-01-13 12:25:54	0.60	4	66	1	1
20	2021-01-13 12:29:20	1.80	4	67	1	3
21	2021-01-13 12:31:53	1.80	4	68	1	3
22	2021-01-13 12:32:43	1.80	1	69	1	3
23	2021-01-13 12:34:15	1.80	1	70	1	3
\.


                                                                                                                                                                                                                                                                                                                                                                            2919.dat                                                                                            0000600 0004000 0002000 00000000333 13776703066 0014274 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1609778109429	InitDB1609778109429
2	1610121122392	AddPasswordEntity1610121122392
3	1610138464116	AddInvoice1610138464116
4	1610142417375	AddQuantityDetail1610142417375
5	1610222638072	AddingRelation1610222638072
\.


                                                                                                                                                                                                                                                                                                     2921.dat                                                                                            0000600 0004000 0002000 00000012615 13776703066 0014273 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        5	GodFather I	A classic of the cinema, the history of old usa italian mafia	https://google.com	10	www.youtube.com	30.00	t
3	Z world war	Z MOVIE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!	https://google.com	10	www.youtube.com	15.00	t
4	Rocky Balboa	The return to the ring to the old Rocky Balboa who wants demostrate his talent	https://google.com	10	www.youtube.com	15.00	t
2	Avatar	New description !!!!!!!!!!!!!!!!!!!!!!!!!!	https://google.com	7	www.youtube.com	5.75	t
1	Rocky I	The movie of the beginning of the legend of Rocky Balboa	https://google.com	7	www.youtube.com	2.00	t
11	Kidnap Syndicate	Other rupture of muscle (nontraumatic), left forearm	http://dummyimage.com/188x133.jpg/5fa2dd/ffffff	24	http://dummyimage.com/133x161.png/ff4444/ffffff	2.35	t
14	Sabata	War operations involving unspecified effect of nuclear weapon, civilian, initial encounter	http://dummyimage.com/241x150.jpg/dddddd/000000	4	http://dummyimage.com/118x219.bmp/dddddd/000000	34.52	t
15	Repo Man	Unspecified sprain of unspecified hip, subsequent encounter	http://dummyimage.com/196x194.bmp/ff4444/ffffff	14	http://dummyimage.com/145x156.png/5fa2dd/ffffff	32.85	t
16	Pushover	Nondisplaced comminuted fracture of shaft of ulna, right arm, initial encounter for open fracture type IIIA, IIIB, or IIIC	http://dummyimage.com/172x139.bmp/dddddd/000000	30	http://dummyimage.com/203x215.png/ff4444/ffffff	1.72	t
17	Bug	Triplet pregnancy with two or more monoamniotic fetuses, third trimester	http://dummyimage.com/164x157.png/cc0000/ffffff	25	http://dummyimage.com/221x208.jpg/dddddd/000000	42.13	t
18	Left Behind	Diseases of the skin and subcutaneous tissue complicating pregnancy, childbirth and the puerperium	http://dummyimage.com/166x214.bmp/5fa2dd/ffffff	15	http://dummyimage.com/243x116.jpg/5fa2dd/ffffff	3.65	t
19	Another Cinderella Story	Laceration of other specified muscles, fascia and tendons at wrist and hand level	http://dummyimage.com/127x149.jpg/dddddd/000000	20	http://dummyimage.com/158x136.jpg/ff4444/ffffff	39.23	t
20	Mission London	Exposure to other ionizing radiation, subsequent encounter	http://dummyimage.com/214x225.bmp/5fa2dd/ffffff	1	http://dummyimage.com/149x131.png/cc0000/ffffff	39.55	t
10	Dirty Harry	Jumping or diving into unspecified water causing drowning and submersion, subsequent encounter	http://dummyimage.com/231x186.bmp/dddddd/000000	25	http://dummyimage.com/159x113.jpg/ff4444/ffffff	8.75	f
12	American Gigolo	Furuncle of other sites	http://dummyimage.com/223x204.jpg/5fa2dd/ffffff	9	http://dummyimage.com/139x189.png/cc0000/ffffff	19.23	f
13	Youngblood	Sprain of other specified parts of left shoulder girdle, subsequent encounter	http://dummyimage.com/146x118.png/ff4444/ffffff	25	http://dummyimage.com/187x114.bmp/dddddd/000000	18.90	f
21	The Last Shark	Displaced supracondylar fracture without intracondylar extension of lower end of right femur, subsequent encounter for open fracture type I or II with nonunion	http://dummyimage.com/179x176.jpg/cc0000/ffffff	29	http://dummyimage.com/184x183.png/cc0000/ffffff	8.90	t
22	Gb-to-pancreas anastom	Polyhydramnios, unspecified trimester, other fetus	http://dummyimage.com/213x235.png/ff4444/ffffff	17	http://dummyimage.com/238x125.png/dddddd/000000	42.30	t
23	Op red-int fix rad/ulna	Acute hematogenous osteomyelitis, unspecified shoulder	http://dummyimage.com/168x147.bmp/cc0000/ffffff	15	http://dummyimage.com/162x114.bmp/dddddd/000000	26.26	t
24	Interruption vena cava	Drowning and submersion due to falling or jumping from burning merchant ship, subsequent encounter	http://dummyimage.com/178x147.png/cc0000/ffffff	30	http://dummyimage.com/109x166.png/dddddd/000000	43.78	t
25	Scan of other sites	Coxa plana	http://dummyimage.com/110x185.png/cc0000/ffffff	18	http://dummyimage.com/216x225.bmp/5fa2dd/ffffff	36.32	t
27	Culture-nervous syst	Other specified injuries of external genitals	http://dummyimage.com/161x161.png/cc0000/ffffff	11	http://dummyimage.com/250x144.jpg/5fa2dd/ffffff	21.95	t
26	Laparoscopic liver bx	Hypertrichosis	http://dummyimage.com/219x146.png/5fa2dd/ffffff	18	http://dummyimage.com/242x217.png/5fa2dd/ffffff	27.29	t
28	Tetanus toxoid administ	Displaced fracture of anterior process of left calcaneus	http://dummyimage.com/192x152.png/ff4444/ffffff	10	http://dummyimage.com/104x140.bmp/5fa2dd/ffffff	17.03	t
29	Opn bx larynx or trachea	Malignant neoplasm of pyriform sinus	http://dummyimage.com/142x160.png/5fa2dd/ffffff	1	http://dummyimage.com/166x235.png/ff4444/ffffff	33.70	t
30	Cryosurg destr rect les	Tympanosclerosis, left ear	http://dummyimage.com/176x214.png/ff4444/ffffff	12	http://dummyimage.com/185x165.jpg/ff4444/ffffff	46.18	t
31	Vascular cath irrigation	Displaced fracture of lateral condyle of unspecified femur, subsequent encounter for closed fracture with malunion	http://dummyimage.com/127x203.jpg/cc0000/ffffff	19	http://dummyimage.com/103x210.jpg/dddddd/000000	26.52	t
32	Insert sengstaken tube	Insect bite (nonvenomous) of right upper arm	http://dummyimage.com/181x126.bmp/ff4444/ffffff	28	http://dummyimage.com/249x224.png/5fa2dd/ffffff	22.29	t
33	Clos small bowel biopsy	Other superficial bite of right knee, sequela	http://dummyimage.com/213x218.jpg/cc0000/ffffff	21	http://dummyimage.com/152x191.png/ff4444/ffffff	16.83	t
34	Exchange transfusion	Rupture of synovium, left hip	http://dummyimage.com/111x149.png/ff4444/ffffff	26	http://dummyimage.com/238x167.bmp/ff4444/ffffff	45.37	t
35	Z WAR	AVATAAR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11	www.google.com	2	www.google.com	14.00	t
\.


                                                                                                                   2923.dat                                                                                            0000600 0004000 0002000 00000000115 13776703066 0014265 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	2
2	11
5	2
5	11
5	13
5	19
2	20
3	15
15	1
3	12
15	19
15	12
15	20
15	14
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                   2924.dat                                                                                            0000600 0004000 0002000 00000000021 13776703066 0014262 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	1
5	5
5	2
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               2925.dat                                                                                            0000600 0004000 0002000 00000000043 13776703066 0014267 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	SUPERADMIN
2	ADMIN
3	CLIENT
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             2927.dat                                                                                            0000600 0004000 0002000 00000000065 13776703066 0014275 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        3	Terror
4	Dramaaa
1	Action!!
5	Action
2	Comedy
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                           2929.dat                                                                                            0000600 0004000 0002000 00000001412 13776703066 0014274 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        21	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiZ21jYW1pbG9lIiwiaWF0IjoxNjEwMTQ4ODMzLCJleHAiOjE2MTAxNTA2MzN9.Qcu5gI0LR9MAxpVSL6F1EcJ3PcBbeXNdZz7L73XjWsE	2021-01-08 17:33:53	2
22	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiZ21jYW1pbG9lIiwiaWF0IjoxNjEwMTUwMTAzLCJleHAiOjE2MTA2OTAxMDN9.AIl_qZlB_z2DO0HwWr-6pYnDNuc_6Cl-VwY2uLAhN6A	2021-01-08 17:55:03	2
23	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoicm9vdCIsImlhdCI6MTYxMDMwNDE3MCwiZXhwIjoxNjEwODQ0MTcwfQ.SPeNswC6YTmz4RRm6q6iIcSBf2IhN5vWT5RA_PAFECY	2021-01-10 12:42:50	1
24	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsInVzZXJuYW1lIjoiam9uQWRtaW4iLCJpYXQiOjE2MTAzMDU1OTMsImV4cCI6MTYxMDg0NTU5M30.OKVDJ9jzBkOf96HMONcvn0URhQR8ZpQcvKufZ1fW7SM	2021-01-10 13:06:33	4
\.


                                                                                                                                                                                                                                                      2931.dat                                                                                            0000600 0004000 0002000 00000003212 13776703066 0014265 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	admin	admin	root	movierentalhw@gmail.com	$2b$10$TlE9g55QPrr4wLdi43VY/Oz8dCfyUX1ug1VGUkAeUjgxCCFGLff5O	1
4	jon	admin	jonAdmin	gmcamiloe@gmail.com	$2b$10$.BO7F.HGYd8MHBsPHd4tXeVZzoj2NkUBROyGjCNDo4Ma/S0qLqWG.	2
9	Elnore	Ambridge	eambridge0	eambridge0@pinterest.com	$2b$10$jVVZmkREADetGmXpxLsLs.L4DA2BB9oKMiDCXQ/TtvUzTOMrrpD1u	3
10	Rodd	Boddam	rboddam1	rboddam1@yolasite.com	$2b$10$LgmBQX/Qnlt7yaxz2gFkSuyajlr1i3y/FTq4ZqdIiHkQhZGlATv4G	3
11	Aguie	Giamuzzo	agiamuzzo3	agiamuzzo3@nature.com	$2b$10$97sC0joKIhYJ49gPVUhvWOJvzESRuLL6dby6VY.g.WKhxoia4P8lO	3
12	Fidelio	Pollicote	fpollicote4	fpollicote4@booking.com	$2b$10$N2T42NflVSOxfMCNDtmBwenQlSOTcww6rHCG7AdV4u9dwhwGTicU6	3
13	Drud	Belz	dbelz5	dbelz5@com.com	$2b$10$RKAI8sAJ0PFyPR9PVPzXJOSuzfK4h6MJfS47ShMFiQvxyDyU2Xwoy	3
14	Melessa	Costi	mcosti7	mcosti7@dagondesign.com	$2b$10$461L2IGfXet.MMu0o1tpne8j9Cw45L4Uy2MOjZHtoIwXsiLNN4JoC	3
15	Andeee	Prosek	aprosek9	aprosek9@barnesandnoble.com	$2b$10$jBfixvL6ry7ekfrbgBWcguWjLPvPqG9Huy4P7f1Y.EmObgZHSzIPq	3
16	Berenice	Attwood	battwoodc	battwoodc@fema.gov	$2b$10$dyjwxzdiVcNqyF4rJtD6POqCE7vMH9atnmQixkEL0IMIJwYmcTAoC	3
17	Lester	Dubarry	ldubarrye	ldubarrye@berkeley.edu	$2b$10$3sGDiJ0kroZDr53M5uJpy.LI.xl3ANDT6dhz0sYiiHH8eHNIE7BBC	3
18	Tiffany	Messitt	tmessitth	tmessitth@disqus.com	$2b$10$lcvkZT4M.X.crncvCVQyNu.YP7Gt4ezpSpzVhFDLOprZ9KIgVzGeW	3
19	Katalin	Lysons	klysonsm	klysonsm@webeden.co.uk	$2b$10$.YiFCHFrSh/MIoOCsLGVdei9kFGxmI53Q6pkPWCMUu2xfdVq15kNa	3
20	Kay	Wadham	kwadhamn	kwadhamn@scribd.com	$2b$10$HMGAnH0OvUoiXNh/VsDkMuwqajLiQ8ExDKMIFEhPzSLsoks.o.c7K	3
2	camilo	gonzalez	gmcamiloe	camilogit123@gmail.com	$2b$10$hWo/IHE3vAiAds8ZRQcHV.FVXn8l3P1YC/8oO1/TZ8C1JtyPyPNLC	3
\.


                                                                                                                                                                                                                                                                                                                                                                                      restore.sql                                                                                         0000600 0004000 0002000 00000064574 13776703066 0015423 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 10.15
-- Dumped by pg_dump version 10.15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.movies_likes_users DROP CONSTRAINT "FK_f725e7469ee5220c6b2246e2dc4";
ALTER TABLE ONLY public.invoice_detail DROP CONSTRAINT "FK_d4843ef5fb0acb6a1ea470236c6";
ALTER TABLE ONLY public.tokens DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2";
ALTER TABLE ONLY public.invoice_detail DROP CONSTRAINT "FK_b7785e906895d2db9e558b11ce5";
ALTER TABLE ONLY public."TokensPassword" DROP CONSTRAINT "FK_b31b080f8ebbb85c0cc8f7ea4eb";
ALTER TABLE ONLY public.invoice_detail DROP CONSTRAINT "FK_9d771c6bbbc45c46a4ff0124fb5";
ALTER TABLE ONLY public."Invoices" DROP CONSTRAINT "FK_9c2859c28c8179e8e013cd091aa";
ALTER TABLE ONLY public.movies_tags_tags DROP CONSTRAINT "FK_5ca2153346a50348cec77c32013";
ALTER TABLE ONLY public.movies_likes_users DROP CONSTRAINT "FK_3d8a15bfe2768dc681c83d3e59a";
ALTER TABLE ONLY public.users DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e";
ALTER TABLE ONLY public.movies_tags_tags DROP CONSTRAINT "FK_21863da94b41f8391153dfef953";
DROP INDEX public."IDX_f725e7469ee5220c6b2246e2dc";
DROP INDEX public."IDX_5ca2153346a50348cec77c3201";
DROP INDEX public."IDX_3d8a15bfe2768dc681c83d3e59";
DROP INDEX public."IDX_21863da94b41f8391153dfef95";
ALTER TABLE ONLY public.tags DROP CONSTRAINT "UQ_d90243459a697eadb8ad56e9092";
ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3";
ALTER TABLE ONLY public.roles DROP CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7";
ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9";
ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59";
ALTER TABLE ONLY public."TokensPassword" DROP CONSTRAINT "REL_b31b080f8ebbb85c0cc8f7ea4e";
ALTER TABLE ONLY public.tags DROP CONSTRAINT "PK_e7dc17249a1148a1970748eda99";
ALTER TABLE ONLY public.movies DROP CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705";
ALTER TABLE ONLY public.movies_likes_users DROP CONSTRAINT "PK_c303bf0f90a0a47d14595aa26c5";
ALTER TABLE ONLY public.roles DROP CONSTRAINT "PK_c1433d71a4838793a49dcad46ab";
ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433";
ALTER TABLE ONLY public."StateMovie" DROP CONSTRAINT "PK_8d9b1ac842f2f90e36d324d5263";
ALTER TABLE ONLY public.migrations DROP CONSTRAINT "PK_8c82d7f526340ab734260ea46be";
ALTER TABLE ONLY public."Invoices" DROP CONSTRAINT "PK_89f2f5f3cb6dc35e50b7c6ab8c2";
ALTER TABLE ONLY public."TokensPassword" DROP CONSTRAINT "PK_8593442423777c2c563d294e11f";
ALTER TABLE ONLY public.movies_tags_tags DROP CONSTRAINT "PK_537bec4e832e964d92ae6cdd06b";
ALTER TABLE ONLY public.invoice_detail DROP CONSTRAINT "PK_3d65640b01305b25702d2de67c4";
ALTER TABLE ONLY public.tokens DROP CONSTRAINT "PK_3001e89ada36263dabf1fb6210a";
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.tokens ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.tags ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.movies ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.invoice_detail ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."TokensPassword" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."StateMovie" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."Invoices" ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.tokens_id_seq;
DROP TABLE public.tokens;
DROP SEQUENCE public.tags_id_seq;
DROP TABLE public.tags;
DROP SEQUENCE public.roles_id_seq;
DROP TABLE public.roles;
DROP TABLE public.movies_tags_tags;
DROP TABLE public.movies_likes_users;
DROP SEQUENCE public.movies_id_seq;
DROP TABLE public.movies;
DROP SEQUENCE public.migrations_id_seq;
DROP TABLE public.migrations;
DROP SEQUENCE public.invoice_detail_id_seq;
DROP TABLE public.invoice_detail;
DROP SEQUENCE public."TokensPassword_id_seq";
DROP TABLE public."TokensPassword";
DROP SEQUENCE public."StateMovie_id_seq";
DROP TABLE public."StateMovie";
DROP SEQUENCE public."Invoices_id_seq";
DROP TABLE public."Invoices";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Invoices; Type: TABLE; Schema: public; Owner: camilo
--

CREATE TABLE public."Invoices" (
    id integer NOT NULL,
    total numeric(5,2) NOT NULL,
    "transactionDate" timestamp without time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public."Invoices" OWNER TO camilo;

--
-- Name: Invoices_id_seq; Type: SEQUENCE; Schema: public; Owner: camilo
--

CREATE SEQUENCE public."Invoices_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Invoices_id_seq" OWNER TO camilo;

--
-- Name: Invoices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: camilo
--

ALTER SEQUENCE public."Invoices_id_seq" OWNED BY public."Invoices".id;


--
-- Name: StateMovie; Type: TABLE; Schema: public; Owner: camilo
--

CREATE TABLE public."StateMovie" (
    id integer NOT NULL,
    name character varying(20) NOT NULL
);


ALTER TABLE public."StateMovie" OWNER TO camilo;

--
-- Name: StateMovie_id_seq; Type: SEQUENCE; Schema: public; Owner: camilo
--

CREATE SEQUENCE public."StateMovie_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."StateMovie_id_seq" OWNER TO camilo;

--
-- Name: StateMovie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: camilo
--

ALTER SEQUENCE public."StateMovie_id_seq" OWNED BY public."StateMovie".id;


--
-- Name: TokensPassword; Type: TABLE; Schema: public; Owner: camilo
--

CREATE TABLE public."TokensPassword" (
    id integer NOT NULL,
    token character varying(100) NOT NULL,
    "createAt" timestamp without time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public."TokensPassword" OWNER TO camilo;

--
-- Name: TokensPassword_id_seq; Type: SEQUENCE; Schema: public; Owner: camilo
--

CREATE SEQUENCE public."TokensPassword_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TokensPassword_id_seq" OWNER TO camilo;

--
-- Name: TokensPassword_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: camilo
--

ALTER SEQUENCE public."TokensPassword_id_seq" OWNED BY public."TokensPassword".id;


--
-- Name: invoice_detail; Type: TABLE; Schema: public; Owner: camilo
--

CREATE TABLE public.invoice_detail (
    id integer NOT NULL,
    "returnDate" timestamp without time zone,
    price numeric(5,2) NOT NULL,
    "stateId" integer,
    "invoiceId" integer,
    "movieId" integer,
    quantity integer NOT NULL
);


ALTER TABLE public.invoice_detail OWNER TO camilo;

--
-- Name: invoice_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: camilo
--

CREATE SEQUENCE public.invoice_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.invoice_detail_id_seq OWNER TO camilo;

--
-- Name: invoice_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: camilo
--

ALTER SEQUENCE public.invoice_detail_id_seq OWNED BY public.invoice_detail.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: camilo
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO camilo;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: camilo
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO camilo;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: camilo
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: movies; Type: TABLE; Schema: public; Owner: camilo
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    title character varying(30) NOT NULL,
    description character varying(1000) NOT NULL,
    poster character varying(100) NOT NULL,
    stock integer NOT NULL,
    "trailerLink" character varying(100) NOT NULL,
    "salePrice" numeric(5,2) NOT NULL,
    availability boolean NOT NULL
);


ALTER TABLE public.movies OWNER TO camilo;

--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: camilo
--

CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movies_id_seq OWNER TO camilo;

--
-- Name: movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: camilo
--

ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;


--
-- Name: movies_likes_users; Type: TABLE; Schema: public; Owner: camilo
--

CREATE TABLE public.movies_likes_users (
    "moviesId" integer NOT NULL,
    "usersId" integer NOT NULL
);


ALTER TABLE public.movies_likes_users OWNER TO camilo;

--
-- Name: movies_tags_tags; Type: TABLE; Schema: public; Owner: camilo
--

CREATE TABLE public.movies_tags_tags (
    "moviesId" integer NOT NULL,
    "tagsId" integer NOT NULL
);


ALTER TABLE public.movies_tags_tags OWNER TO camilo;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: camilo
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(10) NOT NULL
);


ALTER TABLE public.roles OWNER TO camilo;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: camilo
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO camilo;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: camilo
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: camilo
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE public.tags OWNER TO camilo;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: camilo
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_id_seq OWNER TO camilo;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: camilo
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: tokens; Type: TABLE; Schema: public; Owner: camilo
--

CREATE TABLE public.tokens (
    id integer NOT NULL,
    token character varying NOT NULL,
    "createAt" timestamp without time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public.tokens OWNER TO camilo;

--
-- Name: tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: camilo
--

CREATE SEQUENCE public.tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tokens_id_seq OWNER TO camilo;

--
-- Name: tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: camilo
--

ALTER SEQUENCE public.tokens_id_seq OWNED BY public.tokens.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: camilo
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "firstName" character varying(30) NOT NULL,
    "lastName" character varying(30) NOT NULL,
    "userName" character varying(20) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    "roleId" integer
);


ALTER TABLE public.users OWNER TO camilo;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: camilo
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO camilo;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: camilo
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: Invoices id; Type: DEFAULT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public."Invoices" ALTER COLUMN id SET DEFAULT nextval('public."Invoices_id_seq"'::regclass);


--
-- Name: StateMovie id; Type: DEFAULT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public."StateMovie" ALTER COLUMN id SET DEFAULT nextval('public."StateMovie_id_seq"'::regclass);


--
-- Name: TokensPassword id; Type: DEFAULT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public."TokensPassword" ALTER COLUMN id SET DEFAULT nextval('public."TokensPassword_id_seq"'::regclass);


--
-- Name: invoice_detail id; Type: DEFAULT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.invoice_detail ALTER COLUMN id SET DEFAULT nextval('public.invoice_detail_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: tokens id; Type: DEFAULT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.tokens ALTER COLUMN id SET DEFAULT nextval('public.tokens_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: Invoices; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public."Invoices" (id, total, "transactionDate", "userId") FROM stdin;
\.
COPY public."Invoices" (id, total, "transactionDate", "userId") FROM '$$PATH$$/2938.dat';

--
-- Data for Name: StateMovie; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public."StateMovie" (id, name) FROM stdin;
\.
COPY public."StateMovie" (id, name) FROM '$$PATH$$/2917.dat';

--
-- Data for Name: TokensPassword; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public."TokensPassword" (id, token, "createAt", "userId") FROM stdin;
\.
COPY public."TokensPassword" (id, token, "createAt", "userId") FROM '$$PATH$$/2934.dat';

--
-- Data for Name: invoice_detail; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public.invoice_detail (id, "returnDate", price, "stateId", "invoiceId", "movieId", quantity) FROM stdin;
\.
COPY public.invoice_detail (id, "returnDate", price, "stateId", "invoiceId", "movieId", quantity) FROM '$$PATH$$/2936.dat';

--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
\.
COPY public.migrations (id, "timestamp", name) FROM '$$PATH$$/2919.dat';

--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public.movies (id, title, description, poster, stock, "trailerLink", "salePrice", availability) FROM stdin;
\.
COPY public.movies (id, title, description, poster, stock, "trailerLink", "salePrice", availability) FROM '$$PATH$$/2921.dat';

--
-- Data for Name: movies_likes_users; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public.movies_likes_users ("moviesId", "usersId") FROM stdin;
\.
COPY public.movies_likes_users ("moviesId", "usersId") FROM '$$PATH$$/2923.dat';

--
-- Data for Name: movies_tags_tags; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public.movies_tags_tags ("moviesId", "tagsId") FROM stdin;
\.
COPY public.movies_tags_tags ("moviesId", "tagsId") FROM '$$PATH$$/2924.dat';

--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public.roles (id, name) FROM stdin;
\.
COPY public.roles (id, name) FROM '$$PATH$$/2925.dat';

--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public.tags (id, name) FROM stdin;
\.
COPY public.tags (id, name) FROM '$$PATH$$/2927.dat';

--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public.tokens (id, token, "createAt", "userId") FROM stdin;
\.
COPY public.tokens (id, token, "createAt", "userId") FROM '$$PATH$$/2929.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public.users (id, "firstName", "lastName", "userName", email, password, "roleId") FROM stdin;
\.
COPY public.users (id, "firstName", "lastName", "userName", email, password, "roleId") FROM '$$PATH$$/2931.dat';

--
-- Name: Invoices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public."Invoices_id_seq"', 70, true);


--
-- Name: StateMovie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public."StateMovie_id_seq"', 4, true);


--
-- Name: TokensPassword_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public."TokensPassword_id_seq"', 16, true);


--
-- Name: invoice_detail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public.invoice_detail_id_seq', 23, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public.migrations_id_seq', 5, true);


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public.movies_id_seq', 35, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public.tags_id_seq', 5, true);


--
-- Name: tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public.tokens_id_seq', 24, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public.users_id_seq', 20, true);


--
-- Name: tokens PK_3001e89ada36263dabf1fb6210a; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY (id);


--
-- Name: invoice_detail PK_3d65640b01305b25702d2de67c4; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.invoice_detail
    ADD CONSTRAINT "PK_3d65640b01305b25702d2de67c4" PRIMARY KEY (id);


--
-- Name: movies_tags_tags PK_537bec4e832e964d92ae6cdd06b; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.movies_tags_tags
    ADD CONSTRAINT "PK_537bec4e832e964d92ae6cdd06b" PRIMARY KEY ("moviesId", "tagsId");


--
-- Name: TokensPassword PK_8593442423777c2c563d294e11f; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public."TokensPassword"
    ADD CONSTRAINT "PK_8593442423777c2c563d294e11f" PRIMARY KEY (id);


--
-- Name: Invoices PK_89f2f5f3cb6dc35e50b7c6ab8c2; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public."Invoices"
    ADD CONSTRAINT "PK_89f2f5f3cb6dc35e50b7c6ab8c2" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: StateMovie PK_8d9b1ac842f2f90e36d324d5263; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public."StateMovie"
    ADD CONSTRAINT "PK_8d9b1ac842f2f90e36d324d5263" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: roles PK_c1433d71a4838793a49dcad46ab; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);


--
-- Name: movies_likes_users PK_c303bf0f90a0a47d14595aa26c5; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.movies_likes_users
    ADD CONSTRAINT "PK_c303bf0f90a0a47d14595aa26c5" PRIMARY KEY ("moviesId", "usersId");


--
-- Name: movies PK_c5b2c134e871bfd1c2fe7cc3705; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY (id);


--
-- Name: tags PK_e7dc17249a1148a1970748eda99; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY (id);


--
-- Name: TokensPassword REL_b31b080f8ebbb85c0cc8f7ea4e; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public."TokensPassword"
    ADD CONSTRAINT "REL_b31b080f8ebbb85c0cc8f7ea4e" UNIQUE ("userId");


--
-- Name: users UQ_226bb9aa7aa8a69991209d58f59; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName");


--
-- Name: users UQ_450a05c0c4de5b75ac8d34835b9; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9" UNIQUE (password);


--
-- Name: roles UQ_648e3f5447f725579d7d4ffdfb7; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE (name);


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: tags UQ_d90243459a697eadb8ad56e9092; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE (name);


--
-- Name: IDX_21863da94b41f8391153dfef95; Type: INDEX; Schema: public; Owner: camilo
--

CREATE INDEX "IDX_21863da94b41f8391153dfef95" ON public.movies_tags_tags USING btree ("tagsId");


--
-- Name: IDX_3d8a15bfe2768dc681c83d3e59; Type: INDEX; Schema: public; Owner: camilo
--

CREATE INDEX "IDX_3d8a15bfe2768dc681c83d3e59" ON public.movies_likes_users USING btree ("usersId");


--
-- Name: IDX_5ca2153346a50348cec77c3201; Type: INDEX; Schema: public; Owner: camilo
--

CREATE INDEX "IDX_5ca2153346a50348cec77c3201" ON public.movies_tags_tags USING btree ("moviesId");


--
-- Name: IDX_f725e7469ee5220c6b2246e2dc; Type: INDEX; Schema: public; Owner: camilo
--

CREATE INDEX "IDX_f725e7469ee5220c6b2246e2dc" ON public.movies_likes_users USING btree ("moviesId");


--
-- Name: movies_tags_tags FK_21863da94b41f8391153dfef953; Type: FK CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.movies_tags_tags
    ADD CONSTRAINT "FK_21863da94b41f8391153dfef953" FOREIGN KEY ("tagsId") REFERENCES public.tags(id) ON DELETE CASCADE;


--
-- Name: users FK_368e146b785b574f42ae9e53d5e; Type: FK CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES public.roles(id);


--
-- Name: movies_likes_users FK_3d8a15bfe2768dc681c83d3e59a; Type: FK CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.movies_likes_users
    ADD CONSTRAINT "FK_3d8a15bfe2768dc681c83d3e59a" FOREIGN KEY ("usersId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: movies_tags_tags FK_5ca2153346a50348cec77c32013; Type: FK CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.movies_tags_tags
    ADD CONSTRAINT "FK_5ca2153346a50348cec77c32013" FOREIGN KEY ("moviesId") REFERENCES public.movies(id) ON DELETE CASCADE;


--
-- Name: Invoices FK_9c2859c28c8179e8e013cd091aa; Type: FK CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public."Invoices"
    ADD CONSTRAINT "FK_9c2859c28c8179e8e013cd091aa" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: invoice_detail FK_9d771c6bbbc45c46a4ff0124fb5; Type: FK CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.invoice_detail
    ADD CONSTRAINT "FK_9d771c6bbbc45c46a4ff0124fb5" FOREIGN KEY ("movieId") REFERENCES public.movies(id) ON DELETE SET NULL;


--
-- Name: TokensPassword FK_b31b080f8ebbb85c0cc8f7ea4eb; Type: FK CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public."TokensPassword"
    ADD CONSTRAINT "FK_b31b080f8ebbb85c0cc8f7ea4eb" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: invoice_detail FK_b7785e906895d2db9e558b11ce5; Type: FK CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.invoice_detail
    ADD CONSTRAINT "FK_b7785e906895d2db9e558b11ce5" FOREIGN KEY ("stateId") REFERENCES public."StateMovie"(id);


--
-- Name: tokens FK_d417e5d35f2434afc4bd48cb4d2; Type: FK CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: invoice_detail FK_d4843ef5fb0acb6a1ea470236c6; Type: FK CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.invoice_detail
    ADD CONSTRAINT "FK_d4843ef5fb0acb6a1ea470236c6" FOREIGN KEY ("invoiceId") REFERENCES public."Invoices"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: movies_likes_users FK_f725e7469ee5220c6b2246e2dc4; Type: FK CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.movies_likes_users
    ADD CONSTRAINT "FK_f725e7469ee5220c6b2246e2dc4" FOREIGN KEY ("moviesId") REFERENCES public.movies(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    