package yue.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/china")
public class ChinaController {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@ResponseBody
	@RequestMapping("/confirmed_deaths_num")
	public List<Map<String, Object>> confirmed_deaths_num(HttpServletRequest request) {
		String sql = "select sum(Confirmed) as confirmed ,sum(Deaths) as deaths from covid_china;";
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
		return list;
	}
	
	@ResponseBody
	@RequestMapping("/selectAll")
	public List<Map<String, Object>> china_num(HttpServletRequest request) {
		String sql = "select * from covid_china;";
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
		return list;
	}
	

}
