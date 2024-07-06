const windows = document.getElementsByClassName('window');
console.log(windows);
console.log(windows.item(0));

Array.from(windows).forEach(function(win) 
{
    console.log(`found window ${win.dataset.title}`);
});