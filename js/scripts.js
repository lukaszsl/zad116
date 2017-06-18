$(function() {
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for (i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}

	//Column class
	function Column(name) {
		var self = this; // useful for nested functions

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			// CREATING COMPONENTS OF COLUMNS
			var $column = $('<div>').addClass('column'),
				$columnTitle = $('<h2>').addClass('column-title').text(self.name),
				$columnCardList = $('<ul>').addClass('column-card-list'),
				$columnDelete = $('<button>').addClass('btn-delete').text('x'),
				$columnAddCard = $('<button>').addClass('add-card').text('Add a card');
			// ADDING EVENTS
			$columnDelete.click(function() {
				self.removeColumn();
			});
			$columnAddCard.click(function() {
				self.addCard(new Card(prompt('Enter the name of the card')));
			});
			// CONSTRUCTION COLUMN ELEMENT
			$column.append($columnTitle).append($columnDelete).append($columnAddCard).append($columnCardList);
			
			return $column;
		}
	}

	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	};

	//Card class
	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
				// CREATING THE BLOCKS
				var $card = $('<li>').addClass('card'),
					$cardDescription = $('<p>').addClass('card-description').text(self.description),
					$cardDelete = $('<button>').addClass('btn-delete').text('x');
				// ADDING EVENT
				$cardDelete.click(function() {
					self.removeCard();
				});
				// CONSTRUCTION CARD ELEMENT
				$card.append($cardDelete).append($cardDescription);
				
				return $card;
		}
	}

	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	}

	//Board object 
	/*
	var board = {
			name: 'Kanban Board',
			addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	}; */

	function Board(name) {
		var self = this;

		this.name = name;
		this.id = randomString();
		this.$element = createBoard();

		function createBoard() {
			var $board = $('<div id="board">').addClass('board'),
				$boardTitle = $('<h1>').text(self.name);
				//dokończyć tworzenie konstruktora tablicy
		}
	}

	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}

	$('.create-column').click(function(){
		var name = prompt('Enter a column name');
		var column = new Column(name);
		board.addColumn(column);
	});

	// CREATING COLUMNS
	var	todoColumn = new Column('To do'),
		doingColumn = new Column('Doing'),
		doneColumn = new Column('Done');

	// ADDING COLUMNS TO BOARD
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// CREATING NEW CARDS
	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');

	// ADDING CARDS TO COLUMN
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
});