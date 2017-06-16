$(function() {
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for (i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}

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
				self.addCard(new Card(prompt('Enter the name of the card'))); //sprawdzic czy obieky Card jest tworzony w dalszej kolejnosci czy trzeba go stworzyc zaraz po obiekcie Column
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
});