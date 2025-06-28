document.addEventListener('DOMContentLoaded', () => {
  const splashes = [
    '世界が終わるまでは',
    '君がいない世界なんて',
    '空は高く風は歌う',
    '光よりも速く走り抜けろ！',
    '悲しみも痛みも全部受け止めて',
    '世界を壊して、変えてしまえよ',
    '命を賭けて戦うんだ！',
    '誰にも負けたくない',
    '限界なんて、ぶっ壊せ！',
    '翼は折れても、空を夢見る',
    'まだ終わりじゃない！',
    '誇り高き魂よ、燃え上がれ！',
    '昨日の僕に負けたくない',
    '孤独も力に変えてやる',
    '痛みの数だけ、強くなれる',
    '闇を切り裂け、光の刃で！',
    '世界を変える！',
    '君が光',
    'この涙は強さ',
    '愛は痛い',
    'この瞬間に賭けてみろ！',
    '自由はここにある',
    '負けるな！',
    '今を生きろ！',
    '今日は何かが起きる気がする！',
    'テンションMAX！暴走モード！',
    '心は迷子のまま',
    '空に描いた約束',
  ];

  let currentSplash = 0;

  const splashElement = document.getElementById('splashText');
  const headerElement = document.getElementById('centerText');
  const footerElement = document.getElementById('footerNote');

  function isMobileByAspectRatio() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    return aspectRatio < 3 /4;
  }

  function updateSplashFontSize() {
    if (!headerElement || !footerElement) return;

    if (!isMobileByAspectRatio()) {
      splashElement.style.fontSize = '';
      return;
    }

    const headerRect = headerElement.getBoundingClientRect();
    const footerRect = footerElement.getBoundingClientRect();

    const topLimit = headerRect.bottom + 30;
    const bottomLimit = footerRect.top - 16;
    const availableHeight = bottomLimit - topLimit;

    if (availableHeight <= 0) return;

    const textLength = splashElement.textContent.length || 1;
    let fontSize = availableHeight / textLength;

    const minFontSize = 16;
    const maxFontSize = 64;

    fontSize = Math.min(Math.max(fontSize, minFontSize), maxFontSize);
    splashElement.style.fontSize = fontSize + 'px';
  }

  function setSplashText(text) {
    splashElement.style.opacity = 0;
  
    setTimeout(() => {
      splashElement.innerHTML = '';
  
      if (isMobileByAspectRatio()) {
        splashElement.style.writingMode = 'vertical-rl';
        splashElement.style.textOrientation = 'upright';
  
        for (const char of text) {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.display = 'block';
          splashElement.appendChild(span);
        }
      } else {
        splashElement.style.writingMode = 'horizontal-tb';
        splashElement.style.textOrientation = 'initial';
        splashElement.textContent = text;
      }
  
      updateSplashFontSize();
  
      setTimeout(() => {
        splashElement.style.opacity = 1;
      }, 50);
  
    }, 500);
  }
  
  function showNextSplash() {
    currentSplash = (currentSplash + 1) % splashes.length;
    setSplashText(splashes[currentSplash]);
  }

  window.addEventListener('resize', updateSplashFontSize);

  setSplashText(splashes[currentSplash]);

  setTimeout(() => {
    splashElement.style.opacity = 1;
  }, 500);

  setInterval(showNextSplash, 5000);
});