angular
    .module('game')
    .controller('GameController', ['$scope', '$timeout', function($scope, $timeout){
        $scope.gameScore = {
            human: 0,
            computer: 0
        };

        function gameInit() {
            $scope.board = [
                { symbol: "" },
                { symbol: "" },
                { symbol: "" },
                { symbol: "" },
                { symbol: "" },
                { symbol: "" },
                { symbol: "" },
                { symbol: "" },
                { symbol: "" }
            ]

            $scope.gameObject = {
                humanPlayerSymbol: "X",
                gameState: "ongoing",
                canHumanMove: true
            }
        };

        gameInit();

        $scope.play = function(cell) {
            if ($scope.gameObject.canHumanMove === false || cell.symbol !== ""){
                return;
            }
            cell.symbol = $scope.gameObject.humanPlayerSymbol;
            $scope.checkBoard();
            if ($scope.gameObject.gameState === "ongoing"){
                $scope.gameObject.canHumanMove = false;
                $timeout(function(){$scope.computerMove(); $scope.checkBoard(); $scope.gameObject.canHumanMove = true;}, 500);
            }
        };

        $scope.computerMove = function() {
            var i;
            do { i = Math.floor((Math.random() * 8) + 1); }
            while ($scope.board[i].symbol !== "");
            $scope.board[i].symbol = "O";
        };

        $scope.clearBoard = function() {
            gameInit();
            //console.log('Finished clearing board!');
        }

        $scope.checkBoard = function() {
            var board = $scope.board;
            var winner = '';
            function isWon(cell1, cell2, cell3) {
                if(board[cell1].symbol === board[cell2].symbol && board[cell2].symbol === board[cell3].symbol && board[cell1].symbol !== "") {
                    console.log("The game was won");
                    $scope.gameObject.gameState = "won";
                    winner = board[cell1].symbol;
                }
            }

            [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ].forEach(function(cells) {
                isWon(cells[0], cells[1], cells[2]);
            });

            var isDraw = $scope.board.filter(function(element){ return element.symbol !== ""}).length === 9;
            if (isDraw && $scope.gameObject.gameState !== "won") {
                $scope.gameObject.gameState = "draw";
            }
            if($scope.gameObject.gameState === "won" || $scope.gameObject.gameState === "draw"){
                if ($scope.gameObject.gameState === "won"){
                    if (winner === "O"){
                        winner = "Computer";
                        $scope.gameScore.computer++;
                    }
                    else {
                        winner = "You";
                        $scope.gameScore.human++;
                    }
                    $timeout(function(){alert(winner + " won!")}, 0);
                }

                else { $timeout(function(){alert("It'\s a draw")}, 0); }
                $timeout(function(){$scope.clearBoard();}, 500);
            }
        }
    }])
