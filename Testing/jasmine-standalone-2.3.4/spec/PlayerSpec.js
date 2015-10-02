describe('Wait Block', function () {
	var n = new Date();
	console.log("n:" + n)

    it('adds two numbers together', function () {
        expect(1 + 2).toEqual(3);
    });
	it('adds two numbers together', function(){
		expect(2-1).toEqual(1);
	});
	//setTimeout(monkeys(n), function(){var i; var x = 0; for(i=0; i<1000000000000000000; i++){x+=i;}});
	//setTimeout(function(){ monkeys(n); }, 5000);
	console.log(n);
	//setTimeout(monkeys, 5000)
	//setTimeout(monkeys(n), 5000)
	setTimeout(test(n, new Date()), 5000);
	//setTimeout(function(){test(n, new Date())}, 5000)
});
function monkeys(n)
{
	var y = new Date();
	console.log(y);
	console.log(y-n);
	describe('How you Doing?', function(){
		it('Im great thanks for asking', function(){
			expect(y-n).toBeGreaterThan(0);
		});
	});
}
function test(n, y)
{
	console.log(y);
	describe('How you Doing Test?', function(){
		it('Im great thanks for asking', function(){
			expect(y-n).toBeGreaterThan(3);
		});
	});
}

//research
//good tutorial -  http://evanhahn.com/how-do-i-jasmine/
//http://www.htmlgoodies.com/beyond/javascript/test-asynchronous-methods-using-the-jasmine-runs-and-waitfor-methods.html#fbid=1pKOkzADmER
/*it("should simulate an asynchronous call", function () {
  runs(function() {
    flag = false;
    value = 0;
 
    setTimeout(function() {
      value++;
      //keep returning false…
      flag = false;
    }, 500);
  }); 
 
  waitsFor(function() {
    return flag;
  }, "The Value should be incremented", 5000); 
});*/

//https://blog.codeship.com/jasmine-async-testing/






