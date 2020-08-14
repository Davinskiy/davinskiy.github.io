import './scss/style.scss'

(function(){
  const tabs = document.querySelectorAll(".js-tabs")
  tabs.forEach(tab_container => {
    const buttons = tab_container.querySelectorAll('[data-tab-to]')

    buttons.forEach(button => {
      button.addEventListener("click", (e) => {
        const clicked_tab_btn = e.target
        if(!clicked_tab_btn.classList.contains('active')) {
          buttons.forEach(btn => {
            btn.classList.remove('active')
            if (clicked_tab_btn.getAttribute('data-tab-to') === btn.getAttribute('data-tab-to')) {
              btn.classList.add('active')
            }
          })

          toggleTabContent(tab_container)
        }
      })
    })
    toggleTabContent(tab_container)
  })

  function toggleTabContent(tab_container) {
    if (!tab_container instanceof Element) return
    const button = tab_container.querySelector('.active[data-tab-to]')
    tab_container.querySelectorAll('[data-tab-content]').forEach(tab => tab.style.display = 'none')
    tab_container.querySelector(`[data-tab-content="${button.getAttribute('data-tab-to')}"]`).style.display = ''
  }
})()