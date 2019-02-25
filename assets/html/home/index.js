var socket = io(`/api`);

const setters = {
    pages: (pages, state) => $('#menu')
        .append(pages.filter(({ _id }) => !$(`#pages-${_id}`).length).map(menuListItem)),
    queries: (queries, state) => $('.content').append(queries
        .filter(q => state.currentPage && q.page === state.currentPage._id && !$(`#queries-${q._id}`).length)
        .map(queryArray)),
}

let state = new Proxy({
    queries: [],
    pages: [],
    currentPage: null
}, {
	set: function(o, k, v) {
        console.log('CALL', k, v);
        setters[k](v, o);
		o[k] = v;
		return true;
    }
});


setters.currentPage = page => {
    const $content = $('.content');
    $content.empty();
    $content.append(state.queries
        .filter(q => q.page === page._id)
        .map(queryArray))

    socket.emit('page', page._id);
};

['queries', 'pages'].forEach(name => 
    makeRequest({ url: `/${name}`, method: 'get' })
        .catch(console.error)
        .then(data => (state[name] = data)))

window.onhashchange = () => (state.currentPage = state.pages.find(p => p.slug === location.hash.substr(1)))

socket.on('queries', ({ queryId, values }) => {
    $query = $(`#queries-${queryId}`);
    $query.find('tbody').empty().append(queryArrayValues(values));
})
