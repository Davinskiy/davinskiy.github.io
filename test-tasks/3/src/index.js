import './styles/main.less';

const onProductBtnClick = (btn) => {
  let product = btn.closest('.js-product')

  if (!product.classList.contains('disabled')) {
    product.classList.toggle('selected')
    if (product.classList.contains('selected')) {
      product.querySelector(".js-default-show").style.display = 'none'
      product.querySelector(".js-selected-show").style.display = ''
    } else {
      product.querySelector(".js-default-show").style.display = ''
      product.querySelector(".js-selected-show").style.display = 'none'
    }
  }
}

document.querySelectorAll('.js-product-buy').forEach(productButton => {
  productButton.addEventListener("click", function(){
    onProductBtnClick(this)
  })
})
