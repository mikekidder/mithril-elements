
restyle.customElement(
  'clock-face',
  HTMLElement,
  {
    // automatically parsed via restyle
    css: {
      'clock-face': {
        display: 'block',
        width: 200,
        height: 200,
        position: 'relative',
        border: '4px solid black',
        'border-radius': '50%'
      },
      '.clock-face-container::after': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 12,
        height: 12,
        margin: '-6px 0 0 -6px',
        background: 'black',
        'border-radius': 6,
        content: '""',
        display: 'block'
      },
      '.clock-face-container > div': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        background: 'black'
      },
      '.clock-face-hour': {
        margin: '-4px 0 -4px -25%',
        padding: '4px 0 4px 25%',
        'transform-origin': '100% 50%',
        'border-radius': '4px 0 0 4px'
      },
      '.clock-face-minute': {
        margin: '-40% -3px 0',
        padding: '40% 3px 0',
        'transform-origin': '50% 100%',
        'border-radius': '3px 3px 0 0'
      },
      '.clock-face-second': {
        margin: '-40% -1px 0 0',
        padding: '40% 1px 0',
        'transform-origin': '50% 100%'
      }
    },
    createdCallback: function () {
      if (!this.constructor.i) this.constructor.i = 0;

      // unique class or id
      this.className = 'i' + this.constructor.i++;
      // create a prefixed component Restyle object
      // this will allow updates via CSS later on for this
      // component only, overwriting the .css property inherited
      // and used for all clock-face components
      this.css = restyle('clock-face.' + this.className, {});

      this.innerHTML =
        "<div class='clock-face-container'>" +
          "<div class='clock-face-hour'></div>" +
          "<div class='clock-face-minute'></div>" +
          "<div class='clock-face-second'></div>" +
        "</div>";

    },
    attachedCallback: function() {

      // initialize the clock values 
      var time = this.getAttribute("time");

      if (time == "auto"){
        setInterval(function(self) {
          self.updateClock();
        }, 1000, this);
      } else {
        this.readTimeAttribute(time);    
      }
      this.updateClock(); 
      
      this.addEventListener('click', function(){
         console.log("you clicked a clock - " + this.className);
      });

    },    
    readTimeAttribute: function(time) {
      
      var setting = time.split(':');
      
      this.hour = setting[0];
      this.minute = setting[1];
      this.second = setting[2];  
    },
    updateClock: function() {
      var now = new Date(),
      hour = this.hour || now.getHours(),
      minute = this.minute || now.getMinutes(),
      second = this.second || now.getSeconds(),
      secondAngle = second * 6,
      minuteAngle = minute * 6 + secondAngle / 60,
      hourAngle = ( ( hour % 12 ) / 12 ) * 360 + 90 + minute / 12,
      rotate = function (deg) {
        return "rotate(" + deg + "deg)";
      };

      // let restyle take care of the mess here
      this.css.replace({
        '.clock-face-hour': {
          transform: rotate(hourAngle)
        },
        '.clock-face-minute': {
          transform: rotate(minuteAngle)
        },
        '.clock-face-second': {
          transform: rotate(secondAngle)
        }
      });

    },
    attributeChangedCallback: function( attrName, oldVal, newVal ) {
    

    }
  }
);
