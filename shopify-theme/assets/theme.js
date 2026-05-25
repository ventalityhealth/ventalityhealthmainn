/* ─────────────────────────────────────────────────────────────────
   Ventality Theme JS
   - Header scroll state
   - Mobile menu toggle
   - Search bar toggle
   - Cart drawer (open/close + Shopify Ajax cart)
   - Quick add from product cards
   - Variant selectors on product page
   - Quantity steppers (cart drawer + product page)
   ───────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  // ── Utilities ───────────────────────────────────────────────
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const fmtMoney = (cents, currency) => {
    const value = (cents / 100).toFixed(2);
    if (window.Shopify && window.Shopify.formatMoney) {
      try { return window.Shopify.formatMoney(cents, window.theme && window.theme.moneyFormat); } catch (_) {}
    }
    const code = currency || (window.Shopify && window.Shopify.currency && window.Shopify.currency.active) || 'USD';
    try {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: code }).format(value);
    } catch (_) {
      return '$' + value;
    }
  };

  // ── Header scroll state ─────────────────────────────────────
  const header = $('[data-vt-header]');
  if (header) {
    const onScroll = () => {
      header.setAttribute('data-scrolled', String(window.scrollY > 20));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ── Mobile menu ─────────────────────────────────────────────
  const mobileToggle = $('[data-vt-mobile-toggle]');
  const mobileMenu = $('[data-vt-mobile-menu]');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.getAttribute('data-open') === 'true';
      mobileMenu.setAttribute('data-open', String(!isOpen));
      mobileToggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  // ── Search bar toggle ───────────────────────────────────────
  const searchToggle = $('[data-vt-search-toggle]');
  const searchBar = $('[data-vt-search-bar]');
  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', () => {
      const isOpen = searchBar.getAttribute('data-open') === 'true';
      searchBar.setAttribute('data-open', String(!isOpen));
      if (!isOpen) {
        const input = $('input[type="search"], input[name="q"]', searchBar);
        if (input) setTimeout(() => input.focus(), 50);
      }
    });
  }

  // ── Cart Drawer ─────────────────────────────────────────────
  const drawer = $('[data-vt-cart-drawer]');
  const overlay = $('[data-vt-cart-overlay]');
  const drawerBody = $('[data-vt-cart-items]');
  const drawerSubtotal = $('[data-vt-cart-subtotal]');
  const cartBadges = $$('[data-vt-cart-count]');

  const openCart = () => {
    if (!drawer || !overlay) return;
    drawer.setAttribute('data-open', 'true');
    overlay.setAttribute('data-open', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    if (!drawer || !overlay) return;
    drawer.setAttribute('data-open', 'false');
    overlay.setAttribute('data-open', 'false');
    document.body.style.overflow = '';
  };

  $$('[data-vt-cart-open]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
      refreshCart();
    });
  });

  $$('[data-vt-cart-close]').forEach((btn) => {
    btn.addEventListener('click', closeCart);
  });

  if (overlay) overlay.addEventListener('click', closeCart);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.getAttribute('data-open') === 'true') closeCart();
  });

  // ── Cart rendering ──────────────────────────────────────────
  const updateBadges = (count) => {
    cartBadges.forEach((el) => {
      el.textContent = count > 9 ? '9+' : String(count);
      if (count > 0) el.removeAttribute('hidden'); else el.setAttribute('hidden', '');
    });
  };

  const renderCart = (cart) => {
    if (!drawerBody) return;
    updateBadges(cart.item_count || 0);
    if (drawerSubtotal) drawerSubtotal.textContent = fmtMoney(cart.total_price || 0, cart.currency);

    if (!cart.items || cart.items.length === 0) {
      drawerBody.innerHTML = '<div class="vt-cart-empty"><p>' + (window.theme && window.theme.strings && window.theme.strings.cartEmpty || 'Your cart is empty.') + '</p></div>';
      const footer = $('[data-vt-cart-footer]');
      if (footer) footer.style.display = 'none';
      return;
    }

    const footer = $('[data-vt-cart-footer]');
    if (footer) footer.style.display = '';

    drawerBody.innerHTML = cart.items.map((item) => {
      const img = item.image
        ? '<img src="' + item.image.replace('.jpg', '_72x.jpg').replace('.png', '_72x.png') + '" alt="' + escapeHtml(item.product_title || '') + '">'
        : '';
      return `
        <div class="vt-cart-item" data-key="${escapeAttr(item.key)}">
          <div class="vt-cart-item-image">${img}</div>
          <div>
            <p class="vt-cart-item-title">${escapeHtml(item.product_title || '')}</p>
            ${item.variant_title && item.variant_title !== 'Default Title' ? '<p class="vt-cart-item-variant">' + escapeHtml(item.variant_title) + '</p>' : ''}
            <div class="vt-cart-qty">
              <button type="button" data-vt-cart-qty="-1" aria-label="Decrease quantity">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-vt-cart-qty="1" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div>
            <p class="vt-cart-item-price">${fmtMoney(item.final_line_price, cart.currency)}</p>
            <button type="button" class="vt-cart-item-remove" data-vt-cart-remove>Remove</button>
          </div>
        </div>
      `;
    }).join('');

    bindCartItemControls();
  };

  const escapeHtml = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  const escapeAttr = (s) => escapeHtml(s);

  const bindCartItemControls = () => {
    $$('.vt-cart-item', drawerBody).forEach((row) => {
      const key = row.getAttribute('data-key');
      const qtySpan = $('.vt-cart-qty span', row);
      $$('[data-vt-cart-qty]', row).forEach((btn) => {
        btn.addEventListener('click', () => {
          const delta = parseInt(btn.getAttribute('data-vt-cart-qty'), 10);
          const current = parseInt(qtySpan.textContent, 10) || 0;
          changeItem(key, current + delta);
        });
      });
      const removeBtn = $('[data-vt-cart-remove]', row);
      if (removeBtn) removeBtn.addEventListener('click', () => changeItem(key, 0));
    });
  };

  const fetchCart = () => fetch('/cart.js', { credentials: 'same-origin' }).then((r) => r.json());

  const refreshCart = () => fetchCart().then(renderCart).catch(() => {});

  const changeItem = (id, quantity) => {
    return fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ id, quantity })
    })
      .then((r) => r.json())
      .then(renderCart)
      .catch(() => {});
  };

  const addItem = (id, quantity) => {
    return fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ items: [{ id, quantity: quantity || 1 }] })
    })
      .then((r) => {
        if (!r.ok) return r.json().then((err) => { throw err; });
        return r.json();
      })
      .then(() => refreshCart())
      .then(openCart);
  };

  // ── Quick-add from product cards ────────────────────────────
  $$('[data-vt-quick-add]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const variantId = btn.getAttribute('data-variant-id');
      if (!variantId) return;
      btn.disabled = true;
      addItem(variantId, 1).catch(() => {}).finally(() => { btn.disabled = false; });
    });
  });

  // ── Variant selectors on product page ───────────────────────
  const productForm = $('[data-vt-product-form]');
  if (productForm) {
    const variantIdInput = $('input[name="id"]', productForm);
    const optionGroups = $$('[data-vt-option-group]', productForm);
    const priceEl = $('[data-vt-price]');
    const comparePriceEl = $('[data-vt-compare-price]');
    const submitBtn = $('[data-vt-add-button]', productForm);
    const variantsData = window.__VT_VARIANTS__ || [];
    const optionNames = window.__VT_OPTION_NAMES__ || [];

    const currentSelection = optionNames.map((_, i) => {
      const group = optionGroups[i];
      if (!group) return null;
      const active = $('[aria-pressed="true"]', group);
      return active ? active.getAttribute('data-value') : null;
    });

    const findVariant = () => variantsData.find((v) => {
      return currentSelection.every((val, i) => !val || v.options[i] === val);
    });

    const updateState = () => {
      const variant = findVariant();
      if (variant) {
        if (variantIdInput) variantIdInput.value = variant.id;
        if (priceEl) priceEl.textContent = fmtMoney(variant.price);
        if (comparePriceEl) {
          if (variant.compare_at_price && variant.compare_at_price > variant.price) {
            comparePriceEl.textContent = fmtMoney(variant.compare_at_price);
            comparePriceEl.removeAttribute('hidden');
          } else {
            comparePriceEl.setAttribute('hidden', '');
          }
        }
        if (submitBtn) {
          submitBtn.disabled = !variant.available;
          submitBtn.textContent = variant.available ? 'Add to Cart' : 'Sold Out';
        }
      } else if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Unavailable';
      }
    };

    optionGroups.forEach((group, i) => {
      $$('[data-value]', group).forEach((btn) => {
        btn.addEventListener('click', () => {
          $$('[data-value]', group).forEach((b) => b.setAttribute('aria-pressed', 'false'));
          btn.setAttribute('aria-pressed', 'true');
          currentSelection[i] = btn.getAttribute('data-value');
          updateState();
        });
      });
    });

    // Submit via Ajax
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = variantIdInput && variantIdInput.value;
      const qtyInput = $('input[name="quantity"]', productForm);
      const qty = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
      if (!id) return;
      if (submitBtn) submitBtn.disabled = true;
      addItem(id, qty).catch(() => {}).finally(() => { if (submitBtn) submitBtn.disabled = false; });
    });
  }

  // ── Quantity steppers on product page ───────────────────────
  $$('[data-vt-qty-stepper]').forEach((stepper) => {
    const input = $('input[type="number"]', stepper);
    if (!input) return;
    $$('[data-step]', stepper).forEach((btn) => {
      btn.addEventListener('click', () => {
        const delta = parseInt(btn.getAttribute('data-step'), 10);
        const current = parseInt(input.value, 10) || 1;
        const next = Math.max(1, current + delta);
        input.value = next;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
  });

  // ── Initial cart paint (badges) ─────────────────────────────
  refreshCart();
})();
