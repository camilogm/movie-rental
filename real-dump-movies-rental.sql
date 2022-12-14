toc.dat                                                                                             0000600 0004000 0002000 00000061463 13774643720 0014466 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP           4    
             y            rental-movies-dump    10.15    10.15 X    c           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false         d           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false         e           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false         f           1262    65317    rental-movies-dump    DATABASE         CREATE DATABASE "rental-movies-dump" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_El Salvador.1252' LC_CTYPE = 'Spanish_El Salvador.1252';
 $   DROP DATABASE "rental-movies-dump";
             postgres    false                     2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false         g           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                     3079    12924    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false         h           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1         Í            1259    65360    RentBuy    TABLE     
  CREATE TABLE public."RentBuy" (
    id integer NOT NULL,
    "transactionDate" timestamp without time zone NOT NULL,
    "returnDate" timestamp without time zone,
    price numeric(5,2) NOT NULL,
    "userId" integer,
    "movieId" integer,
    "stateId" integer
);
    DROP TABLE public."RentBuy";
       public         camilo    false    3         Ì            1259    65358    RentBuy_id_seq    SEQUENCE        CREATE SEQUENCE public."RentBuy_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."RentBuy_id_seq";
       public       camilo    false    3    205         i           0    0    RentBuy_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."RentBuy_id_seq" OWNED BY public."RentBuy".id;
            public       camilo    false    204         Ë            1259    65352 
   StateMovie    TABLE     g   CREATE TABLE public."StateMovie" (
    id integer NOT NULL,
    name character varying(20) NOT NULL
);
     DROP TABLE public."StateMovie";
       public         camilo    false    3         Ê            1259    65350    StateMovie_id_seq    SEQUENCE        CREATE SEQUENCE public."StateMovie_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."StateMovie_id_seq";
       public       camilo    false    203    3         j           0    0    StateMovie_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."StateMovie_id_seq" OWNED BY public."StateMovie".id;
            public       camilo    false    202         Å            1259    65320 
   migrations    TABLE        CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.migrations;
       public         camilo    false    3         Ä            1259    65318    migrations_id_seq    SEQUENCE        CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public       camilo    false    3    197         k           0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
            public       camilo    false    196         É            1259    65341    movies    TABLE     Y  CREATE TABLE public.movies (
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
       public         camilo    false    3         È            1259    65339    movies_id_seq    SEQUENCE        CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.movies_id_seq;
       public       camilo    false    3    201         l           0    0    movies_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;
            public       camilo    false    200         Ô            1259    65401    movies_likes_users    TABLE     l   CREATE TABLE public.movies_likes_users (
    "moviesId" integer NOT NULL,
    "usersId" integer NOT NULL
);
 &   DROP TABLE public.movies_likes_users;
       public         camilo    false    3         Õ            1259    65408    movies_tags_tags    TABLE     i   CREATE TABLE public.movies_tags_tags (
    "moviesId" integer NOT NULL,
    "tagsId" integer NOT NULL
);
 $   DROP TABLE public.movies_tags_tags;
       public         camilo    false    3         Ï            1259    65368    roles    TABLE     `   CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(10) NOT NULL
);
    DROP TABLE public.roles;
       public         camilo    false    3         Î            1259    65366    roles_id_seq    SEQUENCE        CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public       camilo    false    3    207         m           0    0    roles_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
            public       camilo    false    206         Ç            1259    65331    tags    TABLE     _   CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying(30) NOT NULL
);
    DROP TABLE public.tags;
       public         camilo    false    3         Æ            1259    65329    tags_id_seq    SEQUENCE        CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.tags_id_seq;
       public       camilo    false    3    199         n           0    0    tags_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;
            public       camilo    false    198         Ó            1259    65392    tokens    TABLE     ©   CREATE TABLE public.tokens (
    id integer NOT NULL,
    token character varying NOT NULL,
    "createAt" timestamp without time zone NOT NULL,
    "userId" integer
);
    DROP TABLE public.tokens;
       public         camilo    false    3         Ò            1259    65390    tokens_id_seq    SEQUENCE        CREATE SEQUENCE public.tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.tokens_id_seq;
       public       camilo    false    3    211         o           0    0    tokens_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.tokens_id_seq OWNED BY public.tokens.id;
            public       camilo    false    210         Ñ            1259    65378    users    TABLE     3  CREATE TABLE public.users (
    id integer NOT NULL,
    "firstName" character varying(30) NOT NULL,
    "lastName" character varying(30) NOT NULL,
    "userName" character varying(20) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    "roleId" integer
);
    DROP TABLE public.users;
       public         camilo    false    3         Ð            1259    65376    users_id_seq    SEQUENCE        CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public       camilo    false    209    3         p           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
            public       camilo    false    208         §
           2604    65363 
   RentBuy id    DEFAULT     l   ALTER TABLE ONLY public."RentBuy" ALTER COLUMN id SET DEFAULT nextval('public."RentBuy_id_seq"'::regclass);
 ;   ALTER TABLE public."RentBuy" ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    204    205    205         ¦
           2604    65355    StateMovie id    DEFAULT     r   ALTER TABLE ONLY public."StateMovie" ALTER COLUMN id SET DEFAULT nextval('public."StateMovie_id_seq"'::regclass);
 >   ALTER TABLE public."StateMovie" ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    202    203    203         £
           2604    65323    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    197    196    197         ¥
           2604    65344 	   movies id    DEFAULT     f   ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);
 8   ALTER TABLE public.movies ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    200    201    201         ¨
           2604    65371    roles id    DEFAULT     d   ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    206    207    207         ¤
           2604    65334    tags id    DEFAULT     b   ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);
 6   ALTER TABLE public.tags ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    199    198    199         ª
           2604    65395 	   tokens id    DEFAULT     f   ALTER TABLE ONLY public.tokens ALTER COLUMN id SET DEFAULT nextval('public.tokens_id_seq'::regclass);
 8   ALTER TABLE public.tokens ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    211    210    211         ©
           2604    65381    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public       camilo    false    208    209    209         X          0    65360    RentBuy 
   TABLE DATA               o   COPY public."RentBuy" (id, "transactionDate", "returnDate", price, "userId", "movieId", "stateId") FROM stdin;
    public       camilo    false    205       2904.dat V          0    65352 
   StateMovie 
   TABLE DATA               0   COPY public."StateMovie" (id, name) FROM stdin;
    public       camilo    false    203       2902.dat P          0    65320 
   migrations 
   TABLE DATA               ;   COPY public.migrations (id, "timestamp", name) FROM stdin;
    public       camilo    false    197       2896.dat T          0    65341    movies 
   TABLE DATA               q   COPY public.movies (id, title, description, poster, stock, "trailerLink", "salePrice", availability) FROM stdin;
    public       camilo    false    201       2900.dat _          0    65401    movies_likes_users 
   TABLE DATA               C   COPY public.movies_likes_users ("moviesId", "usersId") FROM stdin;
    public       camilo    false    212       2911.dat `          0    65408    movies_tags_tags 
   TABLE DATA               @   COPY public.movies_tags_tags ("moviesId", "tagsId") FROM stdin;
    public       camilo    false    213       2912.dat Z          0    65368    roles 
   TABLE DATA               )   COPY public.roles (id, name) FROM stdin;
    public       camilo    false    207       2906.dat R          0    65331    tags 
   TABLE DATA               (   COPY public.tags (id, name) FROM stdin;
    public       camilo    false    199       2898.dat ^          0    65392    tokens 
   TABLE DATA               A   COPY public.tokens (id, token, "createAt", "userId") FROM stdin;
    public       camilo    false    211       2910.dat \          0    65378    users 
   TABLE DATA               c   COPY public.users (id, "firstName", "lastName", "userName", email, password, "roleId") FROM stdin;
    public       camilo    false    209       2908.dat q           0    0    RentBuy_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."RentBuy_id_seq"', 6, true);
            public       camilo    false    204         r           0    0    StateMovie_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."StateMovie_id_seq"', 4, true);
            public       camilo    false    202         s           0    0    migrations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);
            public       camilo    false    196         t           0    0    movies_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.movies_id_seq', 7, true);
            public       camilo    false    200         u           0    0    roles_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.roles_id_seq', 3, true);
            public       camilo    false    206         v           0    0    tags_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.tags_id_seq', 4, true);
            public       camilo    false    198         w           0    0    tokens_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.tokens_id_seq', 6, true);
            public       camilo    false    210         x           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 5, true);
            public       camilo    false    208         Ä
           2606    65400 %   tokens PK_3001e89ada36263dabf1fb6210a 
   CONSTRAINT     e   ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.tokens DROP CONSTRAINT "PK_3001e89ada36263dabf1fb6210a";
       public         camilo    false    211         Ì
           2606    65412 /   movies_tags_tags PK_537bec4e832e964d92ae6cdd06b 
   CONSTRAINT        ALTER TABLE ONLY public.movies_tags_tags
    ADD CONSTRAINT "PK_537bec4e832e964d92ae6cdd06b" PRIMARY KEY ("moviesId", "tagsId");
 [   ALTER TABLE ONLY public.movies_tags_tags DROP CONSTRAINT "PK_537bec4e832e964d92ae6cdd06b";
       public         camilo    false    213    213         ¬
           2606    65328 )   migrations PK_8c82d7f526340ab734260ea46be 
   CONSTRAINT     i   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.migrations DROP CONSTRAINT "PK_8c82d7f526340ab734260ea46be";
       public         camilo    false    197         ´
           2606    65357 )   StateMovie PK_8d9b1ac842f2f90e36d324d5263 
   CONSTRAINT     k   ALTER TABLE ONLY public."StateMovie"
    ADD CONSTRAINT "PK_8d9b1ac842f2f90e36d324d5263" PRIMARY KEY (id);
 W   ALTER TABLE ONLY public."StateMovie" DROP CONSTRAINT "PK_8d9b1ac842f2f90e36d324d5263";
       public         camilo    false    203         ¶
           2606    65365 &   RentBuy PK_920d41bcb9a8baae24d0d5a999f 
   CONSTRAINT     h   ALTER TABLE ONLY public."RentBuy"
    ADD CONSTRAINT "PK_920d41bcb9a8baae24d0d5a999f" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."RentBuy" DROP CONSTRAINT "PK_920d41bcb9a8baae24d0d5a999f";
       public         camilo    false    205         ¼
           2606    65383 $   users PK_a3ffb1c0c8416b9fc6f907b7433 
   CONSTRAINT     d   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433";
       public         camilo    false    209         ¸
           2606    65373 $   roles PK_c1433d71a4838793a49dcad46ab 
   CONSTRAINT     d   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.roles DROP CONSTRAINT "PK_c1433d71a4838793a49dcad46ab";
       public         camilo    false    207         È
           2606    65405 1   movies_likes_users PK_c303bf0f90a0a47d14595aa26c5 
   CONSTRAINT        ALTER TABLE ONLY public.movies_likes_users
    ADD CONSTRAINT "PK_c303bf0f90a0a47d14595aa26c5" PRIMARY KEY ("moviesId", "usersId");
 ]   ALTER TABLE ONLY public.movies_likes_users DROP CONSTRAINT "PK_c303bf0f90a0a47d14595aa26c5";
       public         camilo    false    212    212         ²
           2606    65349 %   movies PK_c5b2c134e871bfd1c2fe7cc3705 
   CONSTRAINT     e   ALTER TABLE ONLY public.movies
    ADD CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.movies DROP CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705";
       public         camilo    false    201         ®
           2606    65336 #   tags PK_e7dc17249a1148a1970748eda99 
   CONSTRAINT     c   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.tags DROP CONSTRAINT "PK_e7dc17249a1148a1970748eda99";
       public         camilo    false    199         ¾
           2606    65385 $   users UQ_226bb9aa7aa8a69991209d58f59 
   CONSTRAINT     g   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName");
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59";
       public         camilo    false    209         À
           2606    65389 $   users UQ_450a05c0c4de5b75ac8d34835b9 
   CONSTRAINT     e   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9" UNIQUE (password);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9";
       public         camilo    false    209         º
           2606    65375 $   roles UQ_648e3f5447f725579d7d4ffdfb7 
   CONSTRAINT     a   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE (name);
 P   ALTER TABLE ONLY public.roles DROP CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7";
       public         camilo    false    207         Â
           2606    65387 $   users UQ_97672ac88f789774dd47f7c8be3 
   CONSTRAINT     b   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3";
       public         camilo    false    209         °
           2606    65338 #   tags UQ_d90243459a697eadb8ad56e9092 
   CONSTRAINT     `   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE (name);
 O   ALTER TABLE ONLY public.tags DROP CONSTRAINT "UQ_d90243459a697eadb8ad56e9092";
       public         camilo    false    199         É
           1259    65414    IDX_21863da94b41f8391153dfef95    INDEX     a   CREATE INDEX "IDX_21863da94b41f8391153dfef95" ON public.movies_tags_tags USING btree ("tagsId");
 4   DROP INDEX public."IDX_21863da94b41f8391153dfef95";
       public         camilo    false    213         Å
           1259    65407    IDX_3d8a15bfe2768dc681c83d3e59    INDEX     d   CREATE INDEX "IDX_3d8a15bfe2768dc681c83d3e59" ON public.movies_likes_users USING btree ("usersId");
 4   DROP INDEX public."IDX_3d8a15bfe2768dc681c83d3e59";
       public         camilo    false    212         Ê
           1259    65413    IDX_5ca2153346a50348cec77c3201    INDEX     c   CREATE INDEX "IDX_5ca2153346a50348cec77c3201" ON public.movies_tags_tags USING btree ("moviesId");
 4   DROP INDEX public."IDX_5ca2153346a50348cec77c3201";
       public         camilo    false    213         Æ
           1259    65406    IDX_f725e7469ee5220c6b2246e2dc    INDEX     e   CREATE INDEX "IDX_f725e7469ee5220c6b2246e2dc" ON public.movies_likes_users USING btree ("moviesId");
 4   DROP INDEX public."IDX_f725e7469ee5220c6b2246e2dc";
       public         camilo    false    212         Î
           2606    65420 &   RentBuy FK_0f7c34a6acfe7c0bdcb5593b59c    FK CONSTRAINT        ALTER TABLE ONLY public."RentBuy"
    ADD CONSTRAINT "FK_0f7c34a6acfe7c0bdcb5593b59c" FOREIGN KEY ("movieId") REFERENCES public.movies(id) ON DELETE SET NULL;
 T   ALTER TABLE ONLY public."RentBuy" DROP CONSTRAINT "FK_0f7c34a6acfe7c0bdcb5593b59c";
       public       camilo    false    205    201    2738         Õ
           2606    65455 /   movies_tags_tags FK_21863da94b41f8391153dfef953    FK CONSTRAINT     ¢   ALTER TABLE ONLY public.movies_tags_tags
    ADD CONSTRAINT "FK_21863da94b41f8391153dfef953" FOREIGN KEY ("tagsId") REFERENCES public.tags(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.movies_tags_tags DROP CONSTRAINT "FK_21863da94b41f8391153dfef953";
       public       camilo    false    199    2734    213         Ð
           2606    65430 $   users FK_368e146b785b574f42ae9e53d5e    FK CONSTRAINT        ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES public.roles(id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e";
       public       camilo    false    2744    209    207         Ó
           2606    65445 1   movies_likes_users FK_3d8a15bfe2768dc681c83d3e59a    FK CONSTRAINT     ¦   ALTER TABLE ONLY public.movies_likes_users
    ADD CONSTRAINT "FK_3d8a15bfe2768dc681c83d3e59a" FOREIGN KEY ("usersId") REFERENCES public.users(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.movies_likes_users DROP CONSTRAINT "FK_3d8a15bfe2768dc681c83d3e59a";
       public       camilo    false    212    209    2748         Ô
           2606    65450 /   movies_tags_tags FK_5ca2153346a50348cec77c32013    FK CONSTRAINT     ¦   ALTER TABLE ONLY public.movies_tags_tags
    ADD CONSTRAINT "FK_5ca2153346a50348cec77c32013" FOREIGN KEY ("moviesId") REFERENCES public.movies(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.movies_tags_tags DROP CONSTRAINT "FK_5ca2153346a50348cec77c32013";
       public       camilo    false    213    201    2738         Í
           2606    65415 &   RentBuy FK_5d870d26bcb9901cc7bbcb808f3    FK CONSTRAINT        ALTER TABLE ONLY public."RentBuy"
    ADD CONSTRAINT "FK_5d870d26bcb9901cc7bbcb808f3" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE SET NULL;
 T   ALTER TABLE ONLY public."RentBuy" DROP CONSTRAINT "FK_5d870d26bcb9901cc7bbcb808f3";
       public       camilo    false    209    205    2748         Ï
           2606    65425 &   RentBuy FK_a1fe3f1161b2dd5090bbefe87d1    FK CONSTRAINT        ALTER TABLE ONLY public."RentBuy"
    ADD CONSTRAINT "FK_a1fe3f1161b2dd5090bbefe87d1" FOREIGN KEY ("stateId") REFERENCES public."StateMovie"(id);
 T   ALTER TABLE ONLY public."RentBuy" DROP CONSTRAINT "FK_a1fe3f1161b2dd5090bbefe87d1";
       public       camilo    false    203    205    2740         Ñ
           2606    65435 %   tokens FK_d417e5d35f2434afc4bd48cb4d2    FK CONSTRAINT        ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.tokens DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2";
       public       camilo    false    2748    211    209         Ò
           2606    65440 1   movies_likes_users FK_f725e7469ee5220c6b2246e2dc4    FK CONSTRAINT     ¨   ALTER TABLE ONLY public.movies_likes_users
    ADD CONSTRAINT "FK_f725e7469ee5220c6b2246e2dc4" FOREIGN KEY ("moviesId") REFERENCES public.movies(id) ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.movies_likes_users DROP CONSTRAINT "FK_f725e7469ee5220c6b2246e2dc4";
       public       camilo    false    2738    212    201                                                                                                                                                                                                                     2904.dat                                                                                            0000600 0004000 0002000 00000000427 13774643720 0014270 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        4	2021-01-04 10:46:57	\N	15.00	2	3	2
6	2021-01-04 10:48:56	\N	15.00	\N	3	2
1	2021-01-04 10:46:12	2021-01-09 10:46:12	1.00	2	\N	4
2	2021-01-04 10:46:39	2021-01-09 10:46:39	1.00	2	\N	2
3	2021-01-04 10:46:41	\N	2.00	2	\N	2
5	2021-01-04 10:47:21	2021-01-09 10:47:21	1.00	2	\N	4
\.


                                                                                                                                                                                                                                         2902.dat                                                                                            0000600 0004000 0002000 00000000047 13774643720 0014264 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	rent
2	buy
3	delayed
4	returned
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         2896.dat                                                                                            0000600 0004000 0002000 00000000051 13774643720 0014273 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1609778109429	InitDB1609778109429
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       2900.dat                                                                                            0000600 0004000 0002000 00000001076 13774643720 0014265 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	Rocky I	The movie of the beginning of the legend of Rocky Balboa	https://google.com	5	www.youtube.com	2.00	t
4	Rocky Balboa	The return to the ring to the old Rocky Balboa who wants demostrate his talent	https://google.com	15	www.youtube.com	15.00	t
5	GodFather I	A classic of the cinema, the history of old usa italian mafia	https://google.com	4	www.youtube.com	30.00	t
2	Avatar	New description !!!!!!!!!!!!!!!!!!!!!!!!!!	https://google.com	2	www.youtube.com	5.75	t
3	Z world war	Z MOVIE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!	https://google.com	3	www.youtube.com	15.00	t
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                  2911.dat                                                                                            0000600 0004000 0002000 00000000011 13774643720 0014253 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	2
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       2912.dat                                                                                            0000600 0004000 0002000 00000000011 13774643720 0014254 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	1
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       2906.dat                                                                                            0000600 0004000 0002000 00000000043 13774643720 0014264 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	SUPERADMIN
2	ADMIN
3	CLIENT
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             2898.dat                                                                                            0000600 0004000 0002000 00000000054 13774643720 0014300 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	COmedy
3	Terror
4	Dramaaa
1	Action!!
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    2910.dat                                                                                            0000600 0004000 0002000 00000001225 13774643720 0014262 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJSb2xlIjoiU1VQRVJBRE1JTiIsInVzZXJuYW1lIjoicm9vdCIsImlhdCI6MTYwOTc3ODM1NywiZXhwIjoxNjA5NzgwMTU3fQ.3cyPLjRTHlc7chXAiK6WBYN3ZmaSf5xS4imit7nuj5s	2021-01-04 10:39:17	1
5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsInVzZXJSb2xlIjoiQURNSU4iLCJ1c2VybmFtZSI6ImpvbkFkbWluIiwiaWF0IjoxNjA5Nzc5MDUxLCJleHAiOjE2MDk3ODA4NTF9.LzOunFEesxOfKKGpu44C-7xsJuUXsozDVQeSaTaw904	2021-01-04 10:50:51	4
6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsInVzZXJSb2xlIjoiQURNSU4iLCJ1c2VybmFtZSI6ImpvbkFkbWluIiwiaWF0IjoxNjA5Nzc5MDU5LCJleHAiOjE2MDk3ODA4NTl9.x0zs2gFRWn7viDnLWS0PyGe9xZIkGcYhDlR9d_C0N8I	2021-01-04 10:50:59	4
\.


                                                                                                                                                                                                                                                                                                                                                                           2908.dat                                                                                            0000600 0004000 0002000 00000000511 13774643720 0014266 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	camilo	gonzalez	gmcamiloe	camilogit123@gmail.com	$2b$10$XlmN5nSOKKw89qi/hpa4auhemB0t55Kxmz/lH.f0XEo7hnPoEFEyO	3
1	admin	admin	root	movierentalhw@gmail.com	$2b$10$TlE9g55QPrr4wLdi43VY/Oz8dCfyUX1ug1VGUkAeUjgxCCFGLff5O	1
4	jon	admin	jonAdmin	gmcamiloe@gmail.com	$2b$10$.BO7F.HGYd8MHBsPHd4tXeVZzoj2NkUBROyGjCNDo4Ma/S0qLqWG.	2
\.


                                                                                                                                                                                       restore.sql                                                                                         0000600 0004000 0002000 00000053267 13774643720 0015416 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
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
ALTER TABLE ONLY public.tokens DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2";
ALTER TABLE ONLY public."RentBuy" DROP CONSTRAINT "FK_a1fe3f1161b2dd5090bbefe87d1";
ALTER TABLE ONLY public."RentBuy" DROP CONSTRAINT "FK_5d870d26bcb9901cc7bbcb808f3";
ALTER TABLE ONLY public.movies_tags_tags DROP CONSTRAINT "FK_5ca2153346a50348cec77c32013";
ALTER TABLE ONLY public.movies_likes_users DROP CONSTRAINT "FK_3d8a15bfe2768dc681c83d3e59a";
ALTER TABLE ONLY public.users DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e";
ALTER TABLE ONLY public.movies_tags_tags DROP CONSTRAINT "FK_21863da94b41f8391153dfef953";
ALTER TABLE ONLY public."RentBuy" DROP CONSTRAINT "FK_0f7c34a6acfe7c0bdcb5593b59c";
DROP INDEX public."IDX_f725e7469ee5220c6b2246e2dc";
DROP INDEX public."IDX_5ca2153346a50348cec77c3201";
DROP INDEX public."IDX_3d8a15bfe2768dc681c83d3e59";
DROP INDEX public."IDX_21863da94b41f8391153dfef95";
ALTER TABLE ONLY public.tags DROP CONSTRAINT "UQ_d90243459a697eadb8ad56e9092";
ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3";
ALTER TABLE ONLY public.roles DROP CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7";
ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9";
ALTER TABLE ONLY public.users DROP CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59";
ALTER TABLE ONLY public.tags DROP CONSTRAINT "PK_e7dc17249a1148a1970748eda99";
ALTER TABLE ONLY public.movies DROP CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705";
ALTER TABLE ONLY public.movies_likes_users DROP CONSTRAINT "PK_c303bf0f90a0a47d14595aa26c5";
ALTER TABLE ONLY public.roles DROP CONSTRAINT "PK_c1433d71a4838793a49dcad46ab";
ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433";
ALTER TABLE ONLY public."RentBuy" DROP CONSTRAINT "PK_920d41bcb9a8baae24d0d5a999f";
ALTER TABLE ONLY public."StateMovie" DROP CONSTRAINT "PK_8d9b1ac842f2f90e36d324d5263";
ALTER TABLE ONLY public.migrations DROP CONSTRAINT "PK_8c82d7f526340ab734260ea46be";
ALTER TABLE ONLY public.movies_tags_tags DROP CONSTRAINT "PK_537bec4e832e964d92ae6cdd06b";
ALTER TABLE ONLY public.tokens DROP CONSTRAINT "PK_3001e89ada36263dabf1fb6210a";
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.tokens ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.tags ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.movies ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."StateMovie" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."RentBuy" ALTER COLUMN id DROP DEFAULT;
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
DROP SEQUENCE public."StateMovie_id_seq";
DROP TABLE public."StateMovie";
DROP SEQUENCE public."RentBuy_id_seq";
DROP TABLE public."RentBuy";
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
-- Name: RentBuy; Type: TABLE; Schema: public; Owner: camilo
--

CREATE TABLE public."RentBuy" (
    id integer NOT NULL,
    "transactionDate" timestamp without time zone NOT NULL,
    "returnDate" timestamp without time zone,
    price numeric(5,2) NOT NULL,
    "userId" integer,
    "movieId" integer,
    "stateId" integer
);


ALTER TABLE public."RentBuy" OWNER TO camilo;

--
-- Name: RentBuy_id_seq; Type: SEQUENCE; Schema: public; Owner: camilo
--

CREATE SEQUENCE public."RentBuy_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RentBuy_id_seq" OWNER TO camilo;

--
-- Name: RentBuy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: camilo
--

ALTER SEQUENCE public."RentBuy_id_seq" OWNED BY public."RentBuy".id;


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
-- Name: RentBuy id; Type: DEFAULT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public."RentBuy" ALTER COLUMN id SET DEFAULT nextval('public."RentBuy_id_seq"'::regclass);


--
-- Name: StateMovie id; Type: DEFAULT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public."StateMovie" ALTER COLUMN id SET DEFAULT nextval('public."StateMovie_id_seq"'::regclass);


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
-- Data for Name: RentBuy; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public."RentBuy" (id, "transactionDate", "returnDate", price, "userId", "movieId", "stateId") FROM stdin;
\.
COPY public."RentBuy" (id, "transactionDate", "returnDate", price, "userId", "movieId", "stateId") FROM '$$PATH$$/2904.dat';

--
-- Data for Name: StateMovie; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public."StateMovie" (id, name) FROM stdin;
\.
COPY public."StateMovie" (id, name) FROM '$$PATH$$/2902.dat';

--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
\.
COPY public.migrations (id, "timestamp", name) FROM '$$PATH$$/2896.dat';

--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public.movies (id, title, description, poster, stock, "trailerLink", "salePrice", availability) FROM stdin;
\.
COPY public.movies (id, title, description, poster, stock, "trailerLink", "salePrice", availability) FROM '$$PATH$$/2900.dat';

--
-- Data for Name: movies_likes_users; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public.movies_likes_users ("moviesId", "usersId") FROM stdin;
\.
COPY public.movies_likes_users ("moviesId", "usersId") FROM '$$PATH$$/2911.dat';

--
-- Data for Name: movies_tags_tags; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public.movies_tags_tags ("moviesId", "tagsId") FROM stdin;
\.
COPY public.movies_tags_tags ("moviesId", "tagsId") FROM '$$PATH$$/2912.dat';

--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public.roles (id, name) FROM stdin;
\.
COPY public.roles (id, name) FROM '$$PATH$$/2906.dat';

--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public.tags (id, name) FROM stdin;
\.
COPY public.tags (id, name) FROM '$$PATH$$/2898.dat';

--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public.tokens (id, token, "createAt", "userId") FROM stdin;
\.
COPY public.tokens (id, token, "createAt", "userId") FROM '$$PATH$$/2910.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: camilo
--

COPY public.users (id, "firstName", "lastName", "userName", email, password, "roleId") FROM stdin;
\.
COPY public.users (id, "firstName", "lastName", "userName", email, password, "roleId") FROM '$$PATH$$/2908.dat';

--
-- Name: RentBuy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public."RentBuy_id_seq"', 6, true);


--
-- Name: StateMovie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public."StateMovie_id_seq"', 4, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public.movies_id_seq', 7, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public.tags_id_seq', 4, true);


--
-- Name: tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public.tokens_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: camilo
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: tokens PK_3001e89ada36263dabf1fb6210a; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY (id);


--
-- Name: movies_tags_tags PK_537bec4e832e964d92ae6cdd06b; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.movies_tags_tags
    ADD CONSTRAINT "PK_537bec4e832e964d92ae6cdd06b" PRIMARY KEY ("moviesId", "tagsId");


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
-- Name: RentBuy PK_920d41bcb9a8baae24d0d5a999f; Type: CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public."RentBuy"
    ADD CONSTRAINT "PK_920d41bcb9a8baae24d0d5a999f" PRIMARY KEY (id);


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
-- Name: RentBuy FK_0f7c34a6acfe7c0bdcb5593b59c; Type: FK CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public."RentBuy"
    ADD CONSTRAINT "FK_0f7c34a6acfe7c0bdcb5593b59c" FOREIGN KEY ("movieId") REFERENCES public.movies(id) ON DELETE SET NULL;


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
-- Name: RentBuy FK_5d870d26bcb9901cc7bbcb808f3; Type: FK CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public."RentBuy"
    ADD CONSTRAINT "FK_5d870d26bcb9901cc7bbcb808f3" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: RentBuy FK_a1fe3f1161b2dd5090bbefe87d1; Type: FK CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public."RentBuy"
    ADD CONSTRAINT "FK_a1fe3f1161b2dd5090bbefe87d1" FOREIGN KEY ("stateId") REFERENCES public."StateMovie"(id);


--
-- Name: tokens FK_d417e5d35f2434afc4bd48cb4d2; Type: FK CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: movies_likes_users FK_f725e7469ee5220c6b2246e2dc4; Type: FK CONSTRAINT; Schema: public; Owner: camilo
--

ALTER TABLE ONLY public.movies_likes_users
    ADD CONSTRAINT "FK_f725e7469ee5220c6b2246e2dc4" FOREIGN KEY ("moviesId") REFERENCES public.movies(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         