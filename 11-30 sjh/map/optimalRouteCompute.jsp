<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import='java.util.*' %>
<%@ page import='org.json.simple.JSONArray' %>
<%@ page import='org.json.simple.JSONObject' %>
<%@ page import='org.json.simple.parser.JSONParser' %>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>여행 짜조.com</title>
	<link href="result.css" rel="stylesheet"></link>
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=c42d9650f0d0202aac6c47d98ea0c55d&libraries=services"></script>
    <script src="http://code.jquery.com/jquery-latest.min.js"></script>
	<%!

	static boolean[] fixed;
	static int[] start_time;
	static int[] end_time;
	static int length;
	static int[][] graph;
	static LinkedList<LinkedList<Integer>> result = new LinkedList<LinkedList<Integer>>();
	static LinkedList<LinkedList<Integer>> save_start_time = new LinkedList<>();
	static LinkedList<LinkedList<Integer>> save_end_time = new LinkedList<>();
	String[] arr;
	
	static public int StringTimeToIntTime(String time) {
	    String hour, minute;
	    hour = time.substring(0, 2);
	    minute = time.substring(3, 5);
	    return Integer.parseInt(hour) * 60 + Integer.parseInt(minute);
	}
	
	static public LinkedList<Integer> f() {
	    LinkedList<Integer> temp = new LinkedList<>();
	    for (int i = 0; i < length; i++) {
	        if (fixed[i]) temp.add(i);
	    }
	    return func(temp);
	}
	
	static public LinkedList<Integer> func(LinkedList<Integer> param) {
	    for (int i = 0; i < length; i++) {
	        if (start_time[i] == -1) {
	            int min_total_time = 1000000;
	            int cursor = 1000000;
	            for (int j = 1; j < param.size(); j++) {
	                if (start_time[param.get(j)] - end_time[param.get(j - 1)] > graph[i][param.get(j)] + graph[i][param.get(j - 1)] + 60) {
	                    start_time[i] = end_time[param.get(j - 1)] + graph[i][param.get(j - 1)];
	                    end_time[i] = start_time[i] + 60;
	
	                    // System.out.println("---------------");
	                    // System.out.println(i);
	                    // System.out.println(j);
	                    // System.out.println("---------------");
	
	                    if (min_total_time > graph[i][param.get(j)] + graph[i][param.get(j - 1)] + 60) {
	                        min_total_time = graph[i][param.get(j)] + graph[i][param.get(j - 1)] + 60;
	                        cursor = j;
	                    }
	                }
	            }
	            if (cursor != 1000000) param.add(cursor, i);
	        }
	    }
	    return param;
	}
	%>
	<%
	arr = request.getParameterValues("place");
	
	for (int t = 0; t < arr.length; t++) {
		String input = arr[t];
		System.out.println(input);
		System.out.println();
		System.out.println();
		JSONParser parser = new JSONParser();
	    JSONObject jsonObject = (JSONObject) parser.parse(input);
	
	    JSONArray places = (JSONArray) jsonObject.get("places");
	    JSONArray distanceMatrix = (JSONArray) jsonObject.get("distance");
	    length = places.size(); // 주어진 배열의 길이를 토대로 구함
	    graph = new int[length][length];
	
	    // 카카오 서비스를 통해서 그래프 구축, 그리디를 위해서 각 지점 사이의 시간을 저장
	    for (int i = 0; i < length; i++) {
	    	JSONArray distanceArray = (JSONArray) distanceMatrix.get(i);
	        for (int j = i; j < length; j++) {
	        	int result = ((Long)distanceArray.get(j)).intValue();
	        	
	            graph[i][j] = result / 60; // 초 단위를 분 단위로 변경
	            graph[j][i] = graph[i][j];
	        }
	    }
	    for (int i = 0; i < length; i++) {
	    	for (int j = 0; j < length; j++) {
	    		System.out.print(graph[i][j]);
	    		System.out.print(' ');
	    	}
	    	System.out.println();
	    }
	    // 구축 종료
	
	    // 장소 별 정보 저장
	    fixed = new boolean[length];
	    start_time = new int[length];
	    end_time = new int[length];
	    for (int i = 0; i < length; i++) {
	        JSONArray place = (JSONArray) places.get(i);
	        fixed[i] = (boolean)place.get(1);
	        if (fixed[i]) {
	            start_time[i] = StringTimeToIntTime((String)place.get(2));
	            end_time[i] = StringTimeToIntTime((String)place.get(3));
	        }
	        else {
	            start_time[i] = -1;
	            end_time[i] = -1;
	        }
	    }
	    // 구축 종료
	
	    // for (int i = 0; i < length; i++) {
	    //     for (int j = 0; j < length; j++) {
	    //         System.out.printf("%d ", graph[i][j]);
	    //     }
	    //     System.out.println();
	    // }
	
	    LinkedList<Integer> ans = f();
	    for (int i : ans) System.out.println(i);
	    result.add(ans);
		
	    LinkedList<Integer> start_time_copy = new LinkedList<>();
	    LinkedList<Integer> end_time_copy = new LinkedList<>();
	    
	    for (int i = 0; i < length; i++) {
	        System.out.println(start_time[i]);
	        System.out.println(" ~ ");
	        System.out.println(end_time[i]);
	        System.out.println();
	        
	        start_time_copy.add(start_time[i]);
	        end_time_copy.add(end_time[i]);
	    }
	    save_start_time.add(start_time_copy);
	    save_end_time.add(end_time_copy);
	}
	
	JSONArray place_result = new JSONArray();
    for (int i = 0; i < arr.length; i++) {
        JSONArray list = new JSONArray();
        for (int j = 0; j < result.get(i).size(); j++) {
            list.add(result.get(i).get(j));
        }
        place_result.add(list);
    }

    JSONArray place_list = new JSONArray();
    for (String i : arr) {
        place_list.add(i);
    }

    JSONArray start_time_list = new JSONArray();
    for (int i = 0; i < arr.length; i++) {
        JSONArray list = new JSONArray();
        for (int j = 0; j < result.get(i).size(); j++) {
            list.add(save_start_time.get(i).get(j));
        }
        start_time_list.add(list);
    }

    JSONArray end_time_list = new JSONArray();
    for (int i = 0; i < arr.length; i++) {
        JSONArray list = new JSONArray();
        for (int j = 0; j < result.get(i).size(); j++) {
            list.add(save_end_time.get(i).get(j));
        }
        end_time_list.add(list);
    }
	
	%>
	<script>
		var hashmap = new Map();
		var lengthDay = <%= place_result.size() %>
		var places_str_list = <%= place_list %>
		var places_list = [];
		for (let i = 0; i < places_str_list.length; i++) {
			places_list.push(JSON.parse(places_str_list[i]));
		}
		console.log(places_list);
		var result = <%= place_result %>
		var start_time_list = <%= start_time_list %>
		var end_time_list = <%= end_time_list %>
		
		for (let i = 0; i < lengthDay; i++) {
			let day = i + 1;
			day = day.toString();
			let arr = [];
			for (let j = 0; j < places_list[i].places.length; j++) {
				let cursor = result[i][j];
				arr.push({
					place: places_list[i].places[cursor][0],
					start_time: start_time_list[i][cursor],
					end_time: end_time_list[i][cursor]
				});
			}
			hashmap.set(day, arr);
		}
		
		for (var [key, value] of hashmap) {
			for (var i of value) {
				console.log(i);
			}
			console.log('-------');
		}
	</script>
</head>
<body>
	<div id="places_list_result_wrapper">
		<ul id="places_list_result" ondrop="drop(event)" ondragover="dragover(event)"></ul>
	</div>
	<div class="choose" id="date_text">
		<div><h6 class="chooseText">몇 일 차 선택</h6></div>
		<select name="days" id="what_day">
    	</select>
	</div>
	<span class="body"></span>
	<div id="map"></div>
	<script src="result.js"></script>
</body>
</html>