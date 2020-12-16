package github.ryantaplin.ti.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/api/")
public class ApiController {

	@ResponseBody
	@RequestMapping("hello")
	public String index() {
		return "Hello";
	}
}