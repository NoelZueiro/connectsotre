<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produtos e Carrinho</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }

        .product-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding: 20px;
        }

        .product-card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 200px;
            text-align: center;
            margin-bottom: 20px;
            padding: 10px;
            transition: transform 0.3s ease-in-out;
        }

        .product-card:hover {
            transform: translateY(-10px);
        }

        .product-card img {
            max-width: 100%;
            border-radius: 8px;
        }

        .product-card h4 {
            margin: 10px 0;
        }

        .product-card p {
            font-size: 14px;
            color: #555;
        }

        .product-card button {
            background-color: #ff6f61;
            color: white;
            border: none;
            padding: 8px;
            width: 100%;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .product-card button:hover {
            background-color: #e85d4c;
        }

        /* Carrinho */
        .cart {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #fff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        }

        .cart h4 {
            margin: 0 0 10px 0;
            font-size: 18px;
        }

        .cart-items {
            max-height: 300px;
            overflow-y: auto;
        }

        .cart-items p {
            margin: 10px 0;
            font-size: 14px;
        }

        .cart button {
            background-color: #38a169;
            color: white;
            border: none;
            padding: 10px;
            width: 100%;
            border-radius: 4px;
            cursor: pointer;
        }

        .cart button:hover {
            background-color: #2f855a;
        }

        /* Preço total */
        .total-price {
            margin-top: 15px;
            font-weight: bold;
        }

    </style>
</head>
<body>
    <div class="product-container">
        <!-- Exemplo de produto -->
        <div class="product-card" data-produtoid="0">
            <img src="/assets/img/pag-produtos/GIFTGAMING.png" alt="Nitro Gift Gaming">
            <h4>Nitro Gift Gaming</h4>
            <p>1 mês de Nitro</p>
            <p>R$ 14,50</p>
            <button>Adicionar ao Carrinho</button>
        </div>
        <!-- Repita os blocos acima para outros produtos -->
    </div>

    <!-- Carrinho -->
    <div class="cart">
        <h4>Carrinho</h4>
        <div class="cart-items">
            <p class="cart-item">Nenhum item no carrinho</p>
        </div>
        <div class="total-price">Subtotal: R$ 0,00</div>
        <button id="btnFinalizarCarrinho">Finalizar Compra</button>
    </div>

    <script>
        const products = {
            0: {
                nome: 'Nitro Gift Gaming',
                desc: '✅ 1 mês ✅ Funciona em conta que ja teve nitro.',
                valor: 14.50,
                img: '/assets/img/pag-produtos/GIFTGAMING.png',
                qtd: 1
            },
            // Adicione os outros produtos aqui
        };

        // Função para adicionar produto ao carrinho
        const adicionarAoCarrinho = (id) => {
            const produto = products[id];
            const cart = JSON.parse(localStorage.getItem('cart')) || {};

            // Adiciona o produto ao carrinho
            if (!cart[id]) {
                cart[id] = produto;
            } else {
                cart[id].qtd += 1; // Incrementa a quantidade
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            atualizarCarrinho();
        };

        // Função para atualizar o carrinho
        const atualizarCarrinho = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || {};
            const cartItems = document.querySelector('.cart-items');
            const totalPrice = document.querySelector('.total-price');

            cartItems.innerHTML = ''; // Limpa o conteúdo

            let subtotal = 0;

            Object.keys(cart).forEach(id => {
                const produto = cart[id];
                const item = document.createElement('p');
                item.textContent = `${produto.nome} - R$ ${produto.valor} x ${produto.qtd}`;
                cartItems.appendChild(item);
                subtotal += produto.valor * produto.qtd;
            });

            totalPrice.textContent = `Subtotal: R$ ${subtotal.toFixed(2)}`;
        };

        // Função para finalizar compra
        document.querySelector('#btnFinalizarCarrinho').addEventListener('click', () => {
            Swal.fire({
                title: 'Finalize o pagamento',
                text: 'Faça o pagamento para finalizar a compra.',
                icon: 'info',
                confirmButtonColor: '#DD6B55',
            });
        });

        // Eventos de clique nos produtos
        document.querySelectorAll('.product-card button').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.closest('.product-card').dataset.produtoid;
                adicionarAoCarrinho(id);
            });
        });

        // Carrega o carrinho ao iniciar a página
        document.body.onload = atualizarCarrinho;
    </script>
</body>
</html>
