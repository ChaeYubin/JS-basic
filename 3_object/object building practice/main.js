// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');  // ctx: 캔버스의 그리기 영역을 나타내는 개체, 캔버스에 2D 모양을 그릴 수 있게 함

// width, height - 브라우저 뷰포트(웹페이지가 표시되는 영역)의 너비, 높이와 동일하게 설정

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// ball modelling

class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;  // 화면에서 공이 시작되는 좌표
        this.y = y;
        this.velX = velX;  // 수평 및 수직 속도
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    // 공 그리기
    draw() {
        ctx.beginPath();  // "종이에 모양을 그리고 싶어"
        ctx.fillStyle = this.color;  // 공의 색상 설정
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();  // 경로 그리기 후 지정한 색상으로 영역 채우기
    }

    // 공 움직이게 하기
    update() {
        // 공이 캔버스의 가장자리에 도달했다면 반대 방향으로 이동하도록
        
        // 오른쪽 가장자리
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }
        
        // 왼쪽 가장자리
        if ((this.x - this.size <= 0)) {
            this.velX = -(this.velX);
        }

        // 아래쪽 가장자리
        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }
        
        // 위쪽 가장자리
        if ((this.y - this.size <= 0)) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    // 충돌 감지 메소드
    collisionDetect() {
        for (const ball of balls) {
            if (!(this === ball)) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }
}

const balls = [];

while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size
    );

    balls.push(ball);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();