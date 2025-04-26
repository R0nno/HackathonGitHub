/*Code for the State Dropdown Menu */
const dropdowns = document.querySelectorAll('.dropdown');

//go through all of the dropdown elements
dropdowns.forEach(dropdown =>
{
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');
    //Add click element to select element
    select.addEventListener('click', () =>
        {
            select.classList.toggle('select-clicked');
            caret.classList.toggle('caret-rotate');
            menu.classList.toggle('menu-open');
        });
        //loop through all option elements
        options.forEach(option => {
            option.addEventListener('click', () =>
            {
                selected.innerText = option.innerText;
                select.classList.remove('select-clicked');
                caret.classList.remove('caret-rotate');
                menu.classList.remove('menu-open');
                //remove active class from all option elements
                options.forEach(option => {
                    option.classList.remove('active');
                });
                //add active class to clicked option element
                option.classList.add('active');
            });
        });
});

/*Code for the Bill Dropdown Menu */

const tab = document.querySelector('.tabs'),
    badges = tab.querySelectorAll('.tab'),
    icons = document.querySelectorAll('.icon span'),
    {clientHeight, scrollHeight} = tab;
console.log("test");
badges.forEach(badge => 
{
    badge.addEventListener('click', () =>
    {
        tab.querySelector('.active').classList.remove('active');
        badge.classList.add('active');
        badge.scrollIntoView({
            block: 'center',
            behavior: 'smooth'
        })
    })
});

icons.forEach(icon => {
    icon.addEventListener('click', () =>
    {
        tab.scrollTop += icon.classList.contains('down-arrow') ? 200 : -200;
    })
})


tab.addEventListener('scroll', (e) =>
{
    updateIcons(e.target.scrollTop);
})

tab.addEventListener('wheel', (e) =>
    {
        tab.scrollTop += e.deltaX;
    })

function updateIcons(scrolledHeight)
{
    icons[0].parentElement.classList.toggle('hide', scrolledHeight <= 1);
    icons[1].parentElement.classList.toggle('hide', scrollHeight - (clientHeight + scrolledHeight) <= 1);
}
