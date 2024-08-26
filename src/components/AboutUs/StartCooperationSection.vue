<template>
    <div class="lets-begin">
        <p class="title">ZACZNIJMY WSPÓŁPRACĘ</p>
        <button class="join">DOŁĄCZ</button>
    </div>
</template>
    
    <style scoped>
    .lets-begin {
        height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        flex-direction: column;
        border: 1px solid #363434        ;
    }
    
    
    .title {
        color: #f0f0f0;
        font-family: 'Roboto-Light', 'sans-serif';
        font-size: 42px;
        text-align: center;
    }
    
    .join {
        background-color: #FCB331;
        color: white;
        border: 2px solid #FCB331;
        border-radius: 8px;
        cursor: pointer;
        font-family: 'Roboto-Light', 'sans-serif';
        font-size: 28px;
        padding: 20px 40px;
        transition: all 0.3s ease;
    }
    
    .join:hover {
        color: #1e1e1e;
        background-color: #FCB331;
        border: 2px solid #1E1E1E;
    }
    
    @media (max-width: 768px) {
        .logo {
            height: 50vmin;
            margin-top: 10vh;
        }
    
        .logo img {
            max-height: 50%;
            max-width: 50%;
            height: auto;
            width: auto;
        }
    
        .title {
            font-size: 32px;
            margin-top: 100px;
        }
    }
    </style>