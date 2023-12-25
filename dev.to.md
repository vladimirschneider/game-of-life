Hi there 👋🏼,

In this post I'm going to share with you how I created the Game of Life using JavaScript (again).

Two years ago I wrote my initial version of Game of Life. However, in this new iteration, I aim to introduce improvements based on the knowledge and experience I have gained since then.

In addition, I will guide you through the process of recreating this fascinating game and explain how I approached it.

I hope you'll find this article helpful and inspiring. Let's embark on an exciting journey into the captivating realm of the Game of Life!

The game follows four rules that govern its progression. Let's delve into the rules:

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

These rules dictate the evolution of the game and determine the fate of each cell in each generation.

For this challenge I'm going to use a canvas for drawing board and cells. To process, please ensure that you have a canvas element on your web page.

I decided to use ES6 modules and vanilla JavaScript for this game project. I made a conscious choice to utilize ES6 classes instead of functions this time around.

However, feel free to explore ES6 modules or any existing boilerplate that suits your needs. You could even opt TypeScript for writing the project to gain a different experience or prefer functions over classes.

To use `export` and `import` keywords in your JavaScript files as ES6 modules you need to include them in your HTML document just like regular JavaScript files. However, there is one key difference. You should use the `type` attribute with a value `module` in the HTML attribute.

As in the previous article, I will begin by writing the code with the definitions of constants. These constants will be used to specify the size of the cell, the width and height of the game board, as well as the colors for the cell and the board.

By utilizing constants I can easily configure my game, as you already aware.

In the previous article, I followed a different approach compared to this one. I described the methods of one class and then proceeded to another class to do the same. However, in this article, I will be guiding you through the process of describing and evolving the game together.

The first step is to obtain the `canvas` element. In the `main.js` you can retrieve the `canvas`.

Let's consider the game processes. Based on the game rules you need to have an initial state of the game. To achieve this, you will require a game board and cells. In the `main.js` file you can initialize and launch the game by following these steps: draw background of the game board, initialize cells and finally launch the game.

How could you guess I was referring to three classes and their methods. Let's unveil the details! The following classes are essential for our game:

- `Game` class. This class handles the drawing and management of cells and the game board.
- `Board` class. With this class, we can receive game parameters and draw the game board
- `Cell` class. This class is responsible for drawing current and next generation of cells.

To start the game, all we need is an instance of the `Game` class, and we can initialize it whenever we're ready.

Since we already have the canvas element, let's take care about of the rest.

This sets the stage for the most challenging part of our adventure. I hope you continue this journey with me to the end.

For a wile I pondered where to begin I've settled on describing the `Board` class first. Not only because this class is simpler, but also because it forms the fundamental layer of our game.

I employ private properties for constants within classes that are exclusively used within those classes. You will see this in each of them.

In brief about `Bord` class:
– it features a method for drawing the game board
– it includes getters for board size and canvas context

We've already defined constants for the cell size and board color, utilizing private properties. In the `drawBackground` method we simply draw the background using the `width` and `height` of the context along with the board color from the private property.

For the size getter we return the number of cells at the `x` and `y` coordinates and the cell size. This is achieved by dividing the board sizes by cell size from the constant.

Next, for the context getter we should just return canvas context, nothing more.

Now, let's lay our cards on the table!

The `Cell` class can only draws the cell but also determines whether the cell is alive or death. In fact, this class encapsulates all rules of the game in only one little method!

In brief about `Cell` class:
– it features a method to decide whether the cell is alive or death
– it features a method to draw the cell depending of its state
– it comprises a private `position` getter and a public `alive` getter
– it includes setters to set the `alive` and `neighbor` count

The key details is that the `x` and `y` coordinates stored in the `Game` class. The `Cell` class receives the context and cell size from the `Board` class instance getter.

Every game iteration we launch `nextGeneration` method to determine whether the cell alive or dead and the `drawCells` method to draw the cell.

The `position` getter just holds an array to destructure all these values for the `fillRect` context method used in cell drawing.

The setter and getter for the `alive` simply set and get the private property, just like the `neighbors` setter.

So, now, let's bring it all together.

The first step I suggest is to combine all our classes and classes and their methods without writing introducing new logic.

What do we have on our hands?

We already know that knowledge about the cells is stores in the `Game` class; let's use a private property for it. In fact, it will be the only one private property in this class.

First, initialize everything. We should obtain a board instance to draw it and use the board's getters `size` and `context`. We will be use the class constructor for this, also setting the canvas size.

As a quick remember, the `Game` class should have the `initialize` method. Just do it and let's move on.

At the point, we've successfully implemented numerous methods for drawing and managing our cells. However, there's a crucial missing piece – we haven't cells yet! Let's address this gap!

The `initializeCells` method will iterate over every cell, push it to our `#cells`, set the randomly cell `alive` and then `draw` it!

In the board we already have a `size` getter to obtain `x` and `y` dimensions of this board. We will use it for iteration.

Now that we have the cells and can to operate with them, in the `updateCells` method, we will iterate over each cell twice. The first iteration is to calculate and set all neighbors of the cell, and the second iteration to draw new state.

Each cell already has setter `neighbors` for the first iteration and the methods we need for the second iteration: `nextGeneration` and `draw` too.

To know how much the cell has neighbor can seems easy, but is's a big piece of logic, so I move out it in another method called the `updateCellNeighbors`.

Up until now, we've defined methods, setters and getters but nothing was has been drawn yet. We don't have much left to end our game. Now I wanna describe last piece of our puzzle to be ready to write last method `updateCellNeighbors`.

The `this.board.drawBackground` and `updateCells` are calling in the another method called `launch` and calling it again using `requestAnimationFrame`.

Let's take a moment to summarize and outline what else needs to be written. The last thing we need to be write is `updateCellNeighbors`.

First that we do is get a map of all neighbor of the cell be `x` and `y`.

Some coordinates might be out of the game board bounds. We can check this easy if the `x` coordinate less then 0 or the `x` coordinate more then this.board.size.cellNumberX. For the `y` the same.

The last thing we need to do to finish is choice the neighbor cell and check the cell is alive or dead and count it. After this set neighbors using cell `neighbors` setter.

Congratulations! It's the end of our journey. You could run the game, change something, improve, just feel free with it.

Thank you 💛 dear reader
