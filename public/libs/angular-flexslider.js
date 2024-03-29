(function() {
  'use strict';  angular.module('angular-flexslider', []).directive('flexSlider', [
    '$parse', '$timeout', function($parse, $timeout) {
      return {
        restrict: 'AE',
        scope: false,
        replace: true,
        transclude: true,
        template: '<div class="flexslider-container"></div>',
        compile: function(element, attr, linker) {
          var collectionString, flexsliderDiv, indexString, match, slidesItems, trackBy;

          match = attr.slide.match(/^\s*(.+)\s+in\s+(.*?)(?:\s+track\s+by\s+(.+?))?\s*$/);
          indexString = match[1];
          collectionString = match[2];
          trackBy = angular.isDefined(match[3]) ? $parse(match[3]) : $parse("" + indexString);
          flexsliderDiv = null;
          slidesItems = {};
          return function($scope, $element) {
            var addSlide, getTrackFromItem, removeSlide;

            getTrackFromItem = function(collectionItem) {
              var locals;

              locals = {};
              locals[indexString] = collectionItem;
              return trackBy($scope, locals);
            };
            addSlide = function(collectionItem, index, callback) {
              var childScope, track;

              track = getTrackFromItem(collectionItem);
              if (slidesItems[track] != null) {
                throw "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys.";
              }
              childScope = $scope.$new();
              childScope[indexString] = collectionItem;
              childScope['$index'] = index;
              return linker(childScope, function(clone) {
                var slideItem;

                slideItem = {
                  collectionItem: collectionItem,
                  childScope: childScope,
                  element: clone
                };
                slidesItems[track] = slideItem;
                return typeof callback === "function" ? callback(slideItem) : void 0;
              });
            };
            removeSlide = function(collectionItem) {
              var slideItem, track;

              track = getTrackFromItem(collectionItem);
              slideItem = slidesItems[track];
              if (slideItem == null) {
                return;
              }
              delete slidesItems[track];
              slideItem.childScope.$destroy();
              return slideItem;
            };
            return $scope.$watchCollection(collectionString, function(collection) {
              var attrKey, attrVal, c, currentSlidesLength, e, i, idx, n, options, slider, slides, t, toAdd, toRemove, trackCollection, _i, _j, _k, _l, _len, _len1, _len2, _len3;

              if (!(collection != null ? collection.length : void 0)) {
                return;
              }
              if (flexsliderDiv != null) {
                slider = flexsliderDiv.data('flexslider');
                currentSlidesLength = Object.keys(slidesItems).length;
                if (collection == null) {
                  collection = [];
                }
                trackCollection = {};
                for (_i = 0, _len = collection.length; _i < _len; _i++) {
                  c = collection[_i];
                  trackCollection[getTrackFromItem(c)] = c;
                }
                toAdd = (function() {
                  var _j, _len1, _results;

                  _results = [];
                  for (_j = 0, _len1 = collection.length; _j < _len1; _j++) {
                    c = collection[_j];
                    if (slidesItems[getTrackFromItem(c)] == null) {
                      _results.push(c);
                    }
                  }
                  return _results;
                })();
                toRemove = (function() {
                  var _results;

                  _results = [];
                  for (t in slidesItems) {
                    i = slidesItems[t];
                    if (trackCollection[t] == null) {
                      _results.push(i.collectionItem);
                    }
                  }
                  return _results;
                })();
                if ((toAdd.length === 1 && toRemove.length === 0) || toAdd.length === 0) {
                  for (_j = 0, _len1 = toRemove.length; _j < _len1; _j++) {
                    e = toRemove[_j];
                    e = removeSlide(e);
                    slider.removeSlide(e.element);
                  }
                  for (_k = 0, _len2 = toAdd.length; _k < _len2; _k++) {
                    e = toAdd[_k];
                    idx = collection.indexOf(e);
                    addSlide(e, idx, function(item) {
                      if (idx === currentSlidesLength) {
                        idx = void 0;
                      }
                      return $scope.$evalAsync(function() {
                        return slider.addSlide(item.element, idx);
                      });
                    });
                  }
                  return;
                }
              }
              slidesItems = {};
              if (flexsliderDiv != null) {
                flexsliderDiv.remove();
              }
              slides = angular.element('<ul class="slides"></ul>');
              flexsliderDiv = angular.element('<div class="flexslider"></div>');
              flexsliderDiv.append(slides);
              $element.append(flexsliderDiv);
              for (i = _l = 0, _len3 = collection.length; _l < _len3; i = ++_l) {
                c = collection[i];
                addSlide(c, i, function(item) {
                  return slides.append(item.element);
                });
              }
              options = {};
              for (attrKey in attr) {
                attrVal = attr[attrKey];
                if (attrKey.indexOf('$') === 0) {
                  continue;
                }
                if (!isNaN(n = parseInt(attrVal))) {
                  options[attrKey] = n;
                  continue;
                }
                if (attrVal === 'false' || attrVal === 'true') {
                  options[attrKey] = attrVal === 'true';
                  continue;
                }
                if (attrKey === 'start' || attrKey === 'before' || attrKey === 'after' || attrKey === 'end' || attrKey === 'added' || attrKey === 'removed') {
                  options[attrKey] = (function(attrVal) {
                    var f;

                    f = $parse(attrVal);
                    return function(slider) {
                      return $scope.$apply(function() {
                        return f($scope, {
                          '$slider': slider
                        });
                      });
                    };
                  })(attrVal);
                  continue;
                }
                options[attrKey] = attrVal;
              }
              return $timeout((function() {
                return flexsliderDiv.flexslider(options);
              }), 0);
            });
          };
        }
      };
    }
  ]);

}).call(this);