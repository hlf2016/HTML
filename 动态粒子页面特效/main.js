const particles = []

// 页面初始化时 运行一次
function setup() {
    // 创建画布
    createCanvas(window.innerWidth, window.innerHeight)

    // 计算当前页面宽度下，应该的粒子数量
    const particlesLength = Math.floor(window.innerWidth / 10)
    // 创建粒子类实例
    for (let i = 0; i < particlesLength; i++) {
        particles.push(new Particle())
    }
}

// 测试用的圆形特效
// 一直在运行
// function draw() {
//     if (mouseIsPressed) {
//         // 当鼠标按下时 填充黑色
//         fill(0)
//     } else {
//         // 否则为白色
//         fill(255)
//     }
//     circle(mouseX, mouseY, 80)
// }

function draw() {
    // 设置画布的背景色
    background('#333')
    particles.forEach((p, index) => {
        p.update()
        p.draw()
        p.checkParticles(particles.slice(index))
    })
}

// 创建单个粒子类
class Particle {
    constructor() {
        // 定位
        this.pos = createVector(random(width), random(height))
        // 移动速度
        this.vel = createVector(random(-2, 2), random(-2, 2))
        // 大小
        this.size = 10
    }

    // 粒子状态更新
    update() {
        // 让粒子的位置进行递增
        this.pos.add(this.vel)

        // 更新时检测边界
        this.edges()
    }

    // 绘制单个粒子
    draw() {
        // 禁止描边
        noStroke()
        // 填充颜色
        fill('rgba(255,255,255,0.5)')
        circle(this.pos.x, this.pos.y, this.size)

    }

    // 检测边缘
    edges() {
        // x轴方向 反弹
        if (this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1
        }

        // y轴方向 反弹
        if (this.pos.y < 0 || this.pos.y > height) {
            this.vel.y *= -1
        }
    }

    // 粒子之间用线条连接
    checkParticles(particles) {
        particles.forEach(particle => {
            const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)

            if (d < 120) {
                stroke('rgba(255,255,255,0.1)')
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
            }

        })
    }
}