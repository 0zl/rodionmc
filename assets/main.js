function fireFlies(config) {
    const defaultConfig = {
        number_flies: 40,
        color: '#ffb149',
        elem: 'body'
    };
    config = $.extend({}, defaultConfig, config);

    if (!$(config.elem).length) {
        console.error(`No elements were found that match the selector: '${config.elem}'. Please check it and try again.`);
        return;
    }

    const $element = $(config.elem);
    const elementOffset = $element.offset();
    const height = $element.outerHeight();
    const width = $element.outerWidth();

    if (!$('head style').length) {
        $('head').append('<style></style>');
    }

    const $styleSheet = $('head style').first();

    for (let i = 0; i < config.number_flies; i++) {
        const className = `a${i}`;
        const animationName = `k${i}`;
        const size = 1 + Math.ceil(Math.random() * 15);
        const duration = `${5 + (Math.random() * 60)}s`;
        const x = Math.random() < 0.5 ? 0 : width;
        const y = Math.floor(Math.random() * height);

        const keyframePercent = Math.floor(Math.random() * 40);
        const keyframePercent2 = 50 + Math.floor(Math.random() * 40);
        const plusMinus = 3;

        const keyframeRule = `
        @keyframes ${animationName} {
          50% {
            transform: translate(${x > 0 ? -width : width}px, ${Math.floor((Math.random() * height) - y)}px);
          }
          ${keyframePercent}% { opacity: 1; }
          ${keyframePercent - plusMinus}% { opacity: 0; }
          ${keyframePercent + plusMinus}% { opacity: 0; }
          ${keyframePercent2}% { opacity: 1; }
          ${keyframePercent2 - plusMinus}% { opacity: 0; }
          ${keyframePercent2 + plusMinus}% { opacity: 0; }
        }
      `;

        const styleRule = `
        .${className} {
          position: absolute;
          top: ${y}px;
          left: ${x}px;
          color: ${config.color};
          text-shadow: 0 0 3px ${config.color};
          font-size: ${size}px;
          opacity: 0;
          animation: ${animationName} ${duration} linear infinite;
        }
      `;

        $styleSheet.append(keyframeRule);
        $styleSheet.append(styleRule);

        $element.append(`<div class="${className}">•</div>`);
    }

    const position = config.elem === 'body' ? 'absolute' : 'relative';
    $element.css({
        position: position,
        top: 0,
        left: 0,
        overflow: 'hidden',
        width: width,
        height: height
    });
}

$(document).ready(function () {
    const SERVER_ADDRESS = "mc.rodion-network.com"
    const DISCORD_INVITE = "https://discord.com/invite/emsEUnp"
    const DISCORD_URL = 'https://discord.com/api/v9/invites/emsEUnp?with_counts=true&with_expiration=true'

    // fireFlies({
    //     number_flies: 100,
    //     color: '#ff962e',
    //     elem: '#fireflies'
    // })

    $('#faq-accordion').accordionjs({
        closeAble: true,
        closeOther: true,
        activeIndex: false
    })

    $('#btnHome').click(function () {
        // fade out to bottom for class .v-page
        $('.v-page').fadeOut(200)
    })

    $('#btnVotes').click(function () {
        $('.v-content').each(function () {
            $(this).removeAttr('style')
        })

        $('.votes-c').attr('style', 'display: flex !important');
        $('.v-page').fadeIn(200)
    })

    $('#btnFAQ').click(function () {
        $('.v-content').each(function () {
            $(this).removeAttr('style')
        })

        $('.faq-c').attr('style', 'display: block !important');
        $('.v-page').fadeIn(200)
    })

    $('#btnRules').click(function () {
        window.open('https://conras.notion.site/Community-Guidelines-a730aaef2e4a4e599693d3cf9ec7367f', '_blank')
    })

    $('#btnStore').click(function () {
        window.open('https://www.rodion-network.com/store', '_blank')
    })

    $('#btnServer').click(function () {
        navigator.clipboard.writeText(SERVER_ADDRESS)
        alert('Copied!')
    })

    $('#btnDiscord').click(function () {
        window.open(DISCORD_INVITE, '_blank')
    })

    fetch(DISCORD_URL)
        .then(response => response.json())
        .then(data => {
            $('#discord-member').text(data.approximate_member_count)
        })
})