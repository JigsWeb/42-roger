function menuListItem({ _id, name, slug }) {
    const $li = $(`<li id="pages-${_id}"><a href="#${slug}"><i class="fa fa-link"></i> <span>${name}</span></a></li>`);
    $li.click(() => {
        $li.parent().children('.active').removeClass('active');
        $li.addClass('active');
    })
    return $li;
}

function addPageForm() {
    $form = $(`
        <form>
            <div class="box-body">
                <div class="form-group">
                    <label for="inputName" name="name" class="col-sm-2 control-label">Name</label>

                    <div class="col-sm-10">
                    <input type="text" name="name" class="form-control" id="inputName" placeholder="Name">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputSlug" class="col-sm-2 control-label">Slug</label>

                    <div class="col-sm-10">
                    <input type="text" name="slug" class="form-control" id="inputSlug" placeholder="Slug">
                    </div>
                </div>
                <button type="submit" class="btn btn-info">Create</button>
            </div>
        </form>
    `);

    $form.submit((ev) => {
        ev.preventDefault();
        makeRequest({ url: '/pages', method: 'post', data: $form.serializeJSON() })
            .then(newPage => {
                state.pages = [...state.pages, newPage];
                closeModal();
            })
            .catch(console.error)
    })

    return $form;
}

function addQueryForm() {
    const $elements = {
        command: $(`
            <div id="command-container" class="form-group">
                <label for="command" class="col-sm-2 control-label">Command</label>

                <div class="col-sm-10">
                    <input type="text" name="data[command]" class="form-control" id="command" placeholder="Command">
                </div>
            </div>
        `),
    }

    const $value = index => {
        const $e = $(`
            <div class="form-group value">
                <div class="col-sm-2">
                    <button type="button" class="btn btn-sm btn-danger" data-index="${index}">-</button>
                </div>
                <div class="col-sm-5">
                    <input type="text" name="data[values][${index}][0]" class="form-control" id="inputName" placeholder="Label">
                </div>
                <div class="col-sm-5">
                    <input type="text" name="data[values][${index}][1]" class="form-control" id="inputName" placeholder="Selector">
                </div>
            </div>
        `);
        $e.find('button').click(() => $e.remove());
        return $e;
    }

    const $addValue = $(`<button type="button" id="addValue" style="position: relative;top: 10px;" class="btn btn-success btn-block">Add value</button>`);

    const $form = $(`
        <form>
            <input type="hidden" name="page" value="${state.currentPage._id}" />
            <div class="box-body">
                <div class="form-group">
                    <label for="inputName" name="name" class="col-sm-2 control-label">Name</label>

                    <div class="col-sm-10">
                        <input type="text" name="name" class="form-control" id="inputName" placeholder="Name">
                    </div>
                </div>

                <div class="form-group">
                    <label for="inputSize" name="size" class="col-sm-2 control-label">Width</label>

                    <div class="col-sm-10">
                        <input type="text" name="size" class="form-control" id="inputSize" placeholder="Width (column)">
                    </div>
                </div>

                <div class="form-group">
                    <label for="inputHeight" name="height" class="col-sm-2 control-label">Height</label>

                    <div class="col-sm-10">
                        <input type="text" name="height" class="form-control" id="inputHeight" placeholder="Height (px)">
                    </div>
                </div>

                <div class="form-group">
                    <label for="displayType" class="col-sm-2 control-label">Display</label>

                    <div class="col-sm-10">
                        <select id="displayType" name="outputType" class="form-control">
                            <option value="array">Array</option>
                            <option value="object">Linear</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="inputInterval" name="interval" class="col-sm-2 control-label">Interval</label>

                    <div class="col-sm-10">
                        <input type="text" name="interval" class="form-control" id="inputInterval" placeholder="Interval (ms)">
                    </div>
                </div>

                <div class="form-group">
                    <label for="selectType" class="col-sm-2 control-label">Type</label>

                    <div class="col-sm-10">
                        <select id="selectType" name="shellType" class="form-control">
                            <option value="command">Command</option>
                            <option value="script">Script</option>
                        </select>
                    </div>
                </div>

                <div id="shell-type-sub">${$elements.command.html()}</div>

                <div id="value-container">
                    ${$value(0).html()}
                </div>

                <button type="submit" style="position: relative;top: 10px;" class="btn btn-info btn-block">Create</button>
            </div>
        </form>
    `);

    $form.find('#selectType').change(function() {
        $('#shell-type-sub').empty();
        $('#shell-type-sub').append($elements[$(this).val()]);
    });

    $addValue.click((ev) => {
        ev.preventDefault();
        $("#value-container").append($value($('.value').length + 1))
    })

    $form.find('#value-container').after($addValue);

    $form.submit((ev) => {
        ev.preventDefault();
        makeRequest({ url: '/queries', method: 'post', data: $form.serializeJSON() })
            .then(newQuery => {
                state.queries = [...state.queries, newQuery];
                closeModal();
            })
            .catch(console.error)
    })

    $form

    return $form;
}

function queryArrayValues(values) {
    return $(`${values.map(v => `<tr>${v.map(a => `<td>${a}</td>`)}</tr>`)}`)
}

function queryArray({ name, data, _id, size, height }) {
    const $query = $(`
        <div class="col-sm-${size}">
            <div id="queries-${_id}" class="box box-info">
                <div class="box-header with-border">
                    <h3 class="box-title">${name}</h3>

                    <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                    </div>
                </div>
                <div class="box-body">
                    <div style="max-height: ${height}px; overflow-y: auto;">
                        <table class="table no-margin">
                            <thead>
                                <tr id="table-head"></tr>
                            </thead>
                            <tbody id="table-body"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `)

    $query.find('button').click(() =>
        makeRequest({ url: `/queries/${_id}`, method: 'delete' })
            .then(() => {
                state.queries = state.queries.filter(q => q._id !== _id);
                $query.remove();
            })
            .catch(console.error))

    $query.find('#table-head').append(data.values.map(([label]) => $(`<th>${label}</th>`)));
    $query.find('#table-body').append(data.last_values.map(v => $(`<tr>${v.map(a => `<td>${a}</td>`)}</tr>`)))

    return $query;
}