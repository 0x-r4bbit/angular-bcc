describe('bbc', function () {

  var bbc, $q, $rootScope, $timeout, $httpBackend;

  beforeEach(module('angular-bbc'));

  beforeEach(inject(function (_bbc_, _$q_, _$rootScope_, _$timeout_, _$httpBackend_) {
    bbc = _bbc_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    $httpBackend = _$httpBackend_;

  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be defined', function () {
    expect(bbc).toBeDefined();
  });

  it('should be an object', function () {
    expect(typeof bbc).toBe('object');
  });

  it('should have a method topics()', function () {
    expect(bbc.topics).toBeDefined();
  });

  it('should have a method stories()', function () {
    expect(bbc.stories).toBeDefined();
  });

  describe('.topics()', function () {

    it('should be a function', function () {
      expect(typeof bbc.topics).toBe('function');
    });

    it('should return a promise', function () {
      $httpBackend.when('GET', 'http://api.bbcnews.appengine.co.uk/topics').respond([]);
      $httpBackend.expectGET('http://api.bbcnews.appengine.co.uk/topics');
      expect(bbc.topics().then).toBeDefined();
      $httpBackend.flush();
    });

    it('should be rejected with an error, if it failes', function () {
      var deferred = $q.defer(),
          promise = deferred.promise,
          returnVal;

      promise.then(function (err) {
        returnVal = err;
      });

      $httpBackend.when('GET', 'http://api.bbcnews.appengine.co.uk/topics').respond(function () {
        return [404, ''];
      });

      $httpBackend.expectGET('http://api.bbcnews.appengine.co.uk/topics');

      bbc.topics().then(null, function (err) {
        deferred.resolve(err);
      });

      $httpBackend.flush();
      expect(returnVal instanceof Error).toBe(true);
    });

    it('should return topics array', function () {
      var deferred = $q.defer(),
          promise = deferred.promise,
          returnVal;

      promise.then(function (data) {
        returnVal = data;
      });

      $httpBackend.when('GET', 'http://api.bbcnews.appengine.co.uk/topics').respond([]);
      $httpBackend.expectGET('http://api.bbcnews.appengine.co.uk/topics');

      bbc.topics().then(function (topics) {
        deferred.resolve(topics);
      });

      $httpBackend.flush();
      expect(returnVal.length).toBeDefined();
    });
  });
});
