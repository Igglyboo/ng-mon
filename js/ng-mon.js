angular.module("Pokemon", []).controller("PokemonController",
    function ($scope, $http) {
        $scope.parseInt = parseInt;
        $scope.range = function(n){
            return new Array(n);
        };

        $scope.activePokemon = [];
        $scope.allPokemon = [];
        $scope.truncateNameIds = [386, 413, 487, 492, 550, 555, 641, 642, 645, 647, 648, 678, 710, 711];
        $scope.currentPage = 0;
        $scope.ready = false;

        $scope.$watch('searchQuery', function(searchQuery){
            $scope.currentPage = 0;
            $scope.activePokemon = $scope.allPokemon.filter(function(element){
                return element.name.indexOf(searchQuery) !== -1;
            });
        });

        $http.jsonp('http://pokeapi.co/api/v1/pokedex?callback=JSON_CALLBACK').success(function(data){
            $scope.allPokemon = data.objects[0].pokemon;

            $scope.allPokemon.forEach(function(element){
                element.id = parseInt(element.resource_uri.substring(15).replace("/",""));
                element.img = "http://pokeapi.co/media/img/" + element.id + ".png";
                if($scope.truncateNameIds.indexOf(element.id) !== -1){
                    element.name = element.name.slice(0, element.name.indexOf("-"))
                }
            });

            $scope.allPokemon = $scope.allPokemon.filter(function(element){
                return element.id < 720;
            });

            $scope.allPokemon.sort(function(a, b){
                return a.id > b.id ? 1 : -1;
            });

            $scope.activePokemon = $scope.allPokemon;
            $scope.ready = true;
        });
    }
);