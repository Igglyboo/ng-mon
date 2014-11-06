angular.module("Pokemon", []).controller("PokemonController",
    function ($scope, $http) {
        $scope.activePokemon = [];

        $scope.range = function(min, max, step){
            var input = [];
            if(max < min){
                max = min;
            }
            for(var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        };

        $http.jsonp('http://pokeapi.co/api/v1/pokedex?callback=JSON_CALLBACK').success(function(data){
            $scope.pokemon = data.objects[0].pokemon;

            $scope.pokemon.forEach(function(element){
                element.id = parseInt(element.resource_uri.substring(15).replace("/",""));
            });

            $scope.pokemon = $scope.pokemon.filter(function(element){
                return element.id < 720;
            });

            $scope.pokemon.sort(function(a, b){
                return b.id > a.id;
            });

            $scope.$watch('searchQuery', function(searchQuery){
                $scope.activePokemon = $scope.pokemon.filter(function(element){
                        return element.name.indexOf(searchQuery) !== -1;
                    });
            });
        });
    }
);