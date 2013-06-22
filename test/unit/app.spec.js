describe('angular-bbc', function () {

  var _module;

  beforeEach(module('angular-bbc'));

  beforeEach(function () {
    _module = angular.module('angular-bbc');
  });

  it('exists', function () {
    expect(_module).toBeDefined();
  });
});
