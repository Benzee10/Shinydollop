
<script>
  import { onMount } from 'svelte';
  
  let showModal = false;
  let countdown = 10;
  let intervalId;
  let hasShown = false;
  
  onMount(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasShown) {
        showModal = true;
        hasShown = true;
        startCountdown();
      }
    };
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleEscape);
      if (intervalId) clearInterval(intervalId);
    };
  });
  
  function startCountdown() {
    intervalId = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        window.open('https://whatsappad.vercel.app/', '_blank');
        closeModal();
      }
    }, 1000);
  }
  
  function closeModal() {
    showModal = false;
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
  
  function handleClaim() {
    window.open('https://whatsappad.vercel.app/', '_blank');
    closeModal();
  }
</script>

{#if showModal}
  <div class="exit-modal-overlay" on:click={closeModal}>
    <div class="exit-modal" on:click|stopPropagation>
      <button class="exit-modal__close" on:click={closeModal}>×</button>
      
      <div class="exit-modal__content">
        <div class="exit-modal__icon">🎁</div>
        <h2 class="exit-modal__title">Wait! Don't Miss Out!</h2>
        <p class="exit-modal__subtitle">Get instant access to premium content before you leave</p>
        
        <div class="exit-modal__offer">
          <div class="exit-modal__timer">
            <div class="timer-circle">
              <span class="timer-number">{countdown}</span>
            </div>
            <p>Auto-redirect in {countdown} seconds</p>
          </div>
          
          <div class="exit-modal__benefits">
            <div class="benefit">✨ Exclusive photo galleries</div>
            <div class="benefit">🔥 Premium video content</div>
            <div class="benefit">💎 VIP member access</div>
            <div class="benefit">📱 Mobile-optimized experience</div>
          </div>
        </div>
        
        <div class="exit-modal__actions">
          <button class="btn-claim" on:click={handleClaim}>
            🚀 Claim Access Now
          </button>
          <button class="btn-close" on:click={closeModal}>
            No thanks, I'll stay here
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .exit-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
  }
  
  .exit-modal {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    position: relative;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
  }
  
  .exit-modal__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #999;
    transition: color 0.2s ease;
  }
  
  .exit-modal__close:hover {
    color: #ff6b6b;
  }
  
  .exit-modal__content {
    text-align: center;
  }
  
  .exit-modal__icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  .exit-modal__title {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .exit-modal__subtitle {
    color: #666;
    margin-bottom: 2rem;
  }
  
  .exit-modal__timer {
    margin-bottom: 2rem;
  }
  
  .timer-circle {
    width: 80px;
    height: 80px;
    border: 4px solid #ff6b6b;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    animation: pulse 1s ease-in-out infinite;
  }
  
  .timer-number {
    font-size: 2rem;
    font-weight: bold;
    color: #ff6b6b;
  }
  
  .exit-modal__benefits {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .benefit {
    padding: 0.5rem;
    background: rgba(255, 107, 107, 0.1);
    border-radius: 8px;
    font-size: 0.9rem;
  }
  
  .exit-modal__actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .btn-claim {
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 25px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  
  .btn-claim:hover {
    transform: translateY(-2px);
  }
  
  .btn-close {
    background: none;
    border: 2px solid #ddd;
    padding: 0.8rem 2rem;
    border-radius: 25px;
    color: #666;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .btn-close:hover {
    border-color: #ff6b6b;
    color: #ff6b6b;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @media (max-width: 640px) {
    .exit-modal__benefits {
      grid-template-columns: 1fr;
    }
  }
</style>
