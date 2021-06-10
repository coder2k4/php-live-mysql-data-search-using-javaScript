function sendRequest(query = '') {
    const form_data = new FormData();
    form_data.append('query', query);

    const ajax_request = new XMLHttpRequest()
    ajax_request.open('POST', 'process_data.php')
    ajax_request.send(form_data)

    ajax_request.onreadystatechange = function () {
        if (ajax_request.readyState === 4 && ajax_request.status === 200) {
            const response = JSON.parse(ajax_request.responseText);

            let html = '';

            let serial_no = 1;

            if (response.length > 0) {
                for (let count = 0; count < response.length; count++) {
                    html += '<tr>';
                    html += '<td>' + serial_no + '</td>';
                    html += '<td>' + response[count].post_title + '</td>';
                    html += '<td>' + response[count].post_description + '</td>';
                    html += '</tr>';
                    serial_no++;
                }
            } else {
                html += '<tr><td colspan="3" class="text-center">No Data Found</td></tr>';
            }

            document.getElementById('post_data').innerHTML = html;

            document.getElementById('total_data').innerHTML = response.length;

        }

    }

}

window.onload = function () {
    sendRequest();

    const $search = document.getElementById('search');
    $search.addEventListener('keyup', function (e) {
        sendRequest(e.target.value)
        console.log(e.target.value)
    })
}