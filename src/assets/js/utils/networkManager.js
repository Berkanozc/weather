/**
 * Networkmanager that does an Ajax request to a specified route
 * @author Berkan Ozcakir
 */

class NetworkManager{

    /**
     * Does an AJAX request to a specified server
     * @param url
     * @param type
     * @param data
     * @returns {Promise<unknown>}
     */
    request(url, type, data = {}){
        const json = JSON.stringify(data);

        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: type,
                data: json,
                dataType: 'json',
                contentType: 'application/json; charset=UTF-8',
                success: resolve,
                error: (xhr, ajaxOptions, thrownError) => this.__onFail(xhr, reject)
            });
        });
    }

    /**
     * This function checks if the ajax call did get valid data back
     * @param xhr
     * @param reject
     * @private
     */
    __onFail(xhr, reject) {
        const data = this.parseJSON(xhr.responseText);

        if(data === false){
            reject({code: 1000, reason: "No valid json response"})
        }

        if(xhr.status === 400){
            let error = `Nothing found error:400 ${data.reason}`;
            console.log(error);
        }

        reject({code: xhr.status, reason: data.reason})
    }

    /**
     * This function parses input to JSON, when this is not possible it returns false
     * @param json
     * @returns {boolean|*}
     */
    parseJSON(json) {
        try {
            JSON.parse(json);
            return json
        } catch (e) {
            return false;
        }
    }
}