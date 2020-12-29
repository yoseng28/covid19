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
@RequestMapping("/global")
public class GlobalController {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@ResponseBody
	@RequestMapping("/confirmed_num")
	public List<Map<String, Object>> confirmed_deaths_num(HttpServletRequest request, String limit_num) {
		String sql = "select * from covid_confirmed order by confirmed_num desc limit "+ limit_num +";";
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
		return list;
	}
}
