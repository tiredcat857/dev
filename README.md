# Development

### Link to Deployed Website
If you used the stencil code, this is https://tiredcat857.github.io/dev/

### Goal and Value of the Application
The website displays all the individual cakes from Pastiche. User can browse information about each cake, add cake to favorite, sort the display by name or price, and filter the display by different flavors or allergy.

### Usability Principles Considered
- Visability of system status: when adding item to favorite, users can see the name of the item in the added to the favorite column. If an item is already there or if user tries to remove from favorite of an non-existing item, the system would alert the user. 
- Recognition rather than recall: while scrolling the menu, sort and filter buttons on the left stay at the top, and so does the favorite cart content. This way the user don't have to remember which buttons they have clicked so far and don't have to scroll back and forth.
- Minimalistic: each menu item contains all the necessary information and nothing more.

### Organization of Components
- BakeryItem: hold information about each cake. This makes rendering the menu easy, because each cake is rendered in the same format.
- UpdateMenu: hold information about the menu organization, including the current ordering and filtering criteria.

### How Data is Passed Down Through Components
In the main file App.js, sorting and filtering buttons are displayed and their corresponding onclick functions are set. The onclick function changes the states of the menu. UpdateMenu is then called to make sure the overall menu is updated correctly based on the buttons clicked. After that, each item in menu is mapped to a BakeryItem and rendered.

### How the User Triggers State Changes
There are 5 variables that use states: cart, menu, order, filterList and allergyList. Users can change the state of order by clicking on the radio buttons "price" and "name"; change the state of filterList by clicking on the checkbox buttons "chocolate", "fruity", "coffee", and "something else"; change the state of allergyList by clicking on the checkbox buttons "gluten-free" and "nut-free". Clicking on these buttons mentioned above would also change the state of menu. When users click on "add to favorite" or "remove from favorite", state of cart is changed.
