// Neural Network Animation
class NeuralNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.neurons = [];
        this.connections = [];
        this.memoryNodes = [];
        this.animationId = null;

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        // Create neurons
        const neuronCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        for (let i = 0; i < neuronCount; i++) {
            this.neurons.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 2,
                opacity: Math.random() * 0.5 + 0.3,
                pulsePhase: Math.random() * Math.PI * 2,
                active: false,
                activationTime: 0
            });
        }

        // Create memory nodes (larger, special neurons)
        const memoryCount = Math.floor(neuronCount / 8);
        for (let i = 0; i < memoryCount; i++) {
            this.memoryNodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 4 + 6,
                opacity: Math.random() * 0.3 + 0.5,
                pulsePhase: Math.random() * Math.PI * 2,
                glowIntensity: Math.random() * 0.5 + 0.5
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const time = Date.now() * 0.001;

        // Update and draw neurons
        this.neurons.forEach((neuron, index) => {
            // Update position
            neuron.x += neuron.vx;
            neuron.y += neuron.vy;

            // Bounce off edges
            if (neuron.x < 0 || neuron.x > this.canvas.width) neuron.vx *= -1;
            if (neuron.y < 0 || neuron.y > this.canvas.height) neuron.vy *= -1;

            // Keep in bounds
            neuron.x = Math.max(0, Math.min(this.canvas.width, neuron.x));
            neuron.y = Math.max(0, Math.min(this.canvas.height, neuron.y));

            // Random activation
            if (Math.random() < 0.002) {
                neuron.active = true;
                neuron.activationTime = time;
            }

            // Deactivate after time
            if (neuron.active && time - neuron.activationTime > 2) {
                neuron.active = false;
            }

            // Draw neuron
            const pulse = Math.sin(time * 2 + neuron.pulsePhase) * 0.3 + 0.7;
            const size = neuron.size * pulse;
            const opacity = neuron.opacity * pulse;

            this.ctx.beginPath();
            this.ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2);

            if (neuron.active) {
                // Active neuron - blue glow
                const gradient = this.ctx.createRadialGradient(
                    neuron.x, neuron.y, 0,
                    neuron.x, neuron.y, size * 3
                );
                gradient.addColorStop(0, `rgba(79, 172, 254, ${opacity})`);
                gradient.addColorStop(0.5, `rgba(79, 172, 254, ${opacity * 0.5})`);
                gradient.addColorStop(1, 'rgba(79, 172, 254, 0)');
                this.ctx.fillStyle = gradient;
                this.ctx.fill();

                // Core
                this.ctx.beginPath();
                this.ctx.arc(neuron.x, neuron.y, size * 0.6, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(79, 172, 254, ${opacity * 1.2})`;
                this.ctx.fill();
            } else {
                // Regular neuron - white
                const gradient = this.ctx.createRadialGradient(
                    neuron.x, neuron.y, 0,
                    neuron.x, neuron.y, size * 2
                );
                gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
                gradient.addColorStop(0.7, `rgba(255, 255, 255, ${opacity * 0.3})`);
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
            }
        });

        // Update and draw memory nodes
        this.memoryNodes.forEach(node => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

            // Keep in bounds
            node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            node.y = Math.max(0, Math.min(this.canvas.height, node.y));

            // Draw memory node with special glow
            const pulse = Math.sin(time * 1.5 + node.pulsePhase) * 0.4 + 0.6;
            const size = node.size * pulse;
            const opacity = node.opacity * pulse * node.glowIntensity;

            // Outer glow
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, size * 4
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.8})`);
            gradient.addColorStop(0.3, `rgba(200, 220, 255, ${opacity * 0.4})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, size * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Core
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, size * 0.7, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            this.ctx.fill();
        });

        // Draw connections between nearby neurons
        this.drawConnections();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        const maxDistance = 120;
        const time = Date.now() * 0.001;

        for (let i = 0; i < this.neurons.length; i++) {
            for (let j = i + 1; j < this.neurons.length; j++) {
                const neuron1 = this.neurons[i];
                const neuron2 = this.neurons[j];

                const dx = neuron2.x - neuron1.x;
                const dy = neuron2.y - neuron1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.3;
                    const pulse = Math.sin(time * 3 + i * 0.1) * 0.5 + 0.5;

                    // Connection line
                    this.ctx.beginPath();
                    this.ctx.moveTo(neuron1.x, neuron1.y);
                    this.ctx.lineTo(neuron2.x, neuron2.y);

                    if (neuron1.active || neuron2.active) {
                        // Active connection - blue
                        this.ctx.strokeStyle = `rgba(79, 172, 254, ${opacity * pulse * 0.8})`;
                        this.ctx.lineWidth = 1.5;
                    } else {
                        // Regular connection - white
                        this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * pulse * 0.4})`;
                        this.ctx.lineWidth = 0.8;
                    }

                    this.ctx.stroke();

                    // Animated pulse along connection
                    if ((neuron1.active || neuron2.active) && Math.random() < 0.1) {
                        const progress = (time * 2) % 1;
                        const pulseX = neuron1.x + dx * progress;
                        const pulseY = neuron1.y + dy * progress;

                        this.ctx.beginPath();
                        this.ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
                        this.ctx.fillStyle = `rgba(79, 172, 254, ${opacity * 0.8})`;
                        this.ctx.fill();
                    }
                }
            }
        }

        // Draw connections to memory nodes
        this.memoryNodes.forEach(memoryNode => {
            this.neurons.forEach(neuron => {
                const dx = memoryNode.x - neuron.x;
                const dy = memoryNode.y - neuron.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance * 1.5) {
                    const opacity = (1 - distance / (maxDistance * 1.5)) * 0.2;
                    const pulse = Math.sin(time * 2 + distance * 0.01) * 0.5 + 0.5;

                    this.ctx.beginPath();
                    this.ctx.moveTo(neuron.x, neuron.y);
                    this.ctx.lineTo(memoryNode.x, memoryNode.y);
                    this.ctx.strokeStyle = `rgba(200, 220, 255, ${opacity * pulse})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize neural network
function initNeuralNetwork() {
    const canvas = document.getElementById('neuralCanvas');
    if (canvas) {
        new NeuralNetwork(canvas);
    }
}

// Dynamic Memory Type Typewriter Animation
class TypewriterEffect {
    constructor(element, words, options = {}) {
        this.element = element;
        this.words = words;
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = options.typeSpeed || 150;
        this.deleteSpeed = options.deleteSpeed || 100;
        this.pauseTime = options.pauseTime || 2000;
        this.loop = options.loop !== false;

        this.type();
    }

    type() {
        const currentWord = this.words[this.currentWordIndex];

        if (this.isDeleting) {
            // Deleting characters
            const text = currentWord.substring(0, this.currentCharIndex - 1);
            this.element.innerHTML = text + '<span class="typing-cursor">|</span>';
            this.currentCharIndex--;

            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
                setTimeout(() => this.type(), 500);
                return;
            }
        } else {
            // Typing characters
            const text = currentWord.substring(0, this.currentCharIndex + 1);
            this.element.innerHTML = text + '<span class="typing-cursor">|</span>';
            this.currentCharIndex++;

            if (this.currentCharIndex === currentWord.length) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.pauseTime);
                return;
            }
        }

        const speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        setTimeout(() => this.type(), speed);
    }
}

// Initialize dynamic memory type animation
function initDynamicMemoryType() {
    const memoryTypes = [
        "Enterprise",
        'Agentic',
        'Semantic',
        'Long-term',
        'Short-term',
        'Procedural',
        'Episodic',
        'Working'
    ];

    const element = document.getElementById('dynamicMemoryType');
    if (element) {
        new TypewriterEffect(element, memoryTypes, {
            typeSpeed: 120,
            deleteSpeed: 80,
            pauseTime: 2500
        });
    }
}

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Initialize content visibility on page load
function initContentVisibility() {
    // Make all content visible immediately on page load
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        element.classList.add('visible');
    });

    // Ensure page titles and subtitles are always visible
    const titles = document.querySelectorAll('.page-title, .page-subtitle');
    titles.forEach(title => {
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    });
}

// Smooth scrolling for navigation links
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Header background on scroll
function handleHeaderScroll() {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;

    if (scrolled > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.1)';
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function () {
    initNeuralNetwork();
    initDynamicMemoryType();
    smoothScroll();
    initContentVisibility(); // Make all content visible immediately
    handleScrollAnimations();

    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        handleScrollAnimations();
        handleHeaderScroll();
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Mobile menu toggle function
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Add CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
document.head.appendChild(style);
