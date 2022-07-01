import axios from 'axios';

class API {

  static async requestGet(url) {
    try {
      const result = await axios.get(url);
      return API.parseResult(result);
    } catch (ex) {
      return API.parseResult(ex);
    }
  }

  static async requestPost(url, params) {
    try {
      const result = await axios.post(url, params);
      return API.parseResult(result);
    } catch (ex) {
      return API.parseResult(ex);
    }
  }

  static async requestPut(url, params) {
    try {
      const result = await axios.put(url, params);
      return API.parseResult(result);
    } catch (ex) {
      return API.parseResult(ex);
    }
  }

  static async requestDelete(url) {
    try {
      const result = await axios.delete(url);
      return API.parseResult(result);
    } catch (ex) {
      return API.parseResult(ex);
    }
  }

  static async parseResult(result) {
    if (!!result.data) {
      return {
        success: true,
        data: result.data,
      };
    }
    return {
      success: false,
      error: `${result.code}: ${result.message}`
    }
  }

  static Disc = class Disc {
    static async list() {
      const result = await API.requestGet('/api/getall');
      return result;
    }

    static async add(params) {
      const result = await API.requestPost('/api/add', params);
      return result;
    }

    static async modify(id, params) {
      const result = await API.requestPut(`/api/update/${id}`, params);
      return result;
    }

    static async remove(id) {
      const result = await API.requestDelete(`/api/delete/${id}`);
      return result;
    }
  };

  static Metrix = class Metrix {
    static async listCourses(country = 'FI') {
      const result = await API.requestGet(`https://discgolfmetrix.com/api.php?content=courses_list&country_code=${country}`);
      if (!result.success) {
        return result;
      }
      // null Enddate means the course is in use. Type 2 = course type is child
      const filteredData = result.data.courses.filter(course => course.Enddate === null && course.Type === '2');
      return {
        success: true,
        data: filteredData,
      };
    }

    static async getCourse(id) {
      const result = await API.requestGet(`https://discgolfmetrix.com/api.php?content=course&id=${id}&code=j6GdhsuISfxvEtR70TyjsHEABIwPBEzV`);
      return result;
    }
  };
}

export default API;
